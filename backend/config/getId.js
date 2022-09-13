const config = require('./auth.config')
const jwt = require('jsonwebtoken')

exports.getId = async (req,res) => {
    const token = await req.headers.authorization.split(" ")[1]
    let decode = null
    await jwt.verify(token, config.secret, async(err,_decode) => {
        if (err) {
            console.log(err)
            res.status(500).send('Error')  
        }
        decode = await _decode
    })
    return decode.id
}