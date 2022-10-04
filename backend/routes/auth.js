const verify = require ('../middlewares/middleware_auth/modules')
const controller = require('../controllers/auth.controller')

module.exports = (app) => {
    app.post('/user/signup',
    [
        verify.verifySignUp.checkDuplicateUsernameOrEmail,
        verify.verifySignUp.checkPlanExisted
    ],
    controller.userSignUp
    )

    app.post('/corporate/signup', verify.verifySignUp.checkDuplicateCorporate, controller.corporateSignUp)

    app.post('/user/login', controller.userSignIn)
    app.post('/corporate/login', controller.corporateSignIn)

    app.post('/logout', verify.authJwt.verifyToken, controller.signOut)
    app.delete('/delete_account', controller.deleteAccount)
    app.patch('/update-user', controller.updateAccount)
}