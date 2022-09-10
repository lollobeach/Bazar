const verify = require ('../middlewares/middleware_auth/modules')
const controller = require('../controllers/auth.controller')

module.exports = (app) => {
    app.use((req,res,next) => {
        res.header('Hello')
        next()
    })
    app.post('/Bazar/user/signup',
    [
        verify.verifySignUp.checkDuplicateUsernameOrEmail,
        verify.verifySignUp.checkPlanExisted
    ],
    controller.userSignUp
    )

    app.post('/Bazar/corporate/signup', verify.verifySignUp.checkDuplicateCorporate, controller.corporateSignUp)

    app.post('/Bazar/user/login', controller.userSignIn)
    app.post('/Bazar/corporate/login', controller.corporateSignIn)

    app.post('/Bazar/logout', verify.authJwt.verifyToken, controller.signOut)
    app.delete('/Bazar/delete_account', verify.authJwt.verifyToken, controller.deleteAccount)
}