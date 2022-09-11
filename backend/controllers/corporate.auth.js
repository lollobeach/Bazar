const config = require('../config/auth.config');
const Corporate = require('../models/corporate.model');
let jwt = require('jsonwebtoken');
let bcrpyt = require('bcryptjs');

exports.corporateSignUp = async (req,res) => {
    let iva = req.body.iva;
    if (!iva.match(/^[A-Z]{2}[0-9]{11}$/)) return res.status(406).send('IVA format not correct');
    let email = req.body.email;
    if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) return res.status(406).send('Email format not correct');
    let password = req.body.password;
    if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{-~]).{6,64}$/)) return res.status(406).send('Password format not correct.\nIt is required:\n - minimum length 6 characters;\n - at least 1 capital character\n - at least 1 lower case character\n - at least 1 number\n - at least 1 special character: \|');
    const newCorporate = {
        name: req.body.name,
        countryOfResidence: req.body.countryOfResidence,
        address: req.body.address,
        iva: iva,
        email: email,
        password: bcrpyt.hashSync(password, 12),
        offeredServices: []
    };

    await Corporate.getCorporates().insertOne(newCorporate, async(err) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error');
        }
        res.status(201).send('Successful registration!');
    })
};

function corporatePasswordValidation(req,res,corporate) {
    let passwordIsValid = bcrpyt.compareSync(
        req.body.password,
        corporate.password
        );
    if (!passwordIsValid) return res.status(401).send('Invalid password!');
    let token = jwt.sign(
        { id: corporate.id }, 
        config.secret, {
            expiresIn: 172800 // 48 hours
        });
    req.session.token = token;
    res.status(200).send({
        id: corporate._id,
        name: corporate.name,
        email: corporate.email
    });
};

exports.corporateSignIn = async (req,res) => {
    await Corporate.getCorporates().findOne({ name: req.body.name }, async (err,corporate) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error');
        }
        const _corporate = await corporate;
        if (!_corporate) {
            if (req.body.email) {
                Corporate.getCorporates().findOne({ email: req.body.email}, async (err, email) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).send('Error');
                    }
                    const _email = await email;
                    if (!_email) return res.status(404).send('Email not found!');
                    corporatePasswordValidation(req,res,email);
                })
            } else return res.status(404).send('Corporate not found!');
        }
        corporatePasswordValidation(req,res,corporate);
    })
};

exports.signOut = async (req,res) => {
    try {
        await Corporate.getCorporates().findOne({ name: req.params.corporate }, async (err,corporate) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Error');
            }
            const _corporate = await corporate;
            if (!_corporate) return res.status(404).send('Corporate not found!');
            req.headers.token = null;
            return res.status(200).send('Logout!');
        })
    } catch (err) {
        this.next(err);
    }
};

exports.deleteAccount = (req,res) => {
    Corporate.getCorporates().deleteOne({ name: req.params.corporate }, async (err,_result) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error');
        }
        const result = await _result;
        if (result.deletedCount === 1) return res.status(200).send('Account correctly deleted');
        else return res.status(404).send('Corporate not found');
    })
};