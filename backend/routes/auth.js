const { verifySignUp } = require ('../middlewares/middleware_auth/modules')
const controller = require('../controllers/auth.controller')

module.exports = (app) => {
    app.use((req,res,next) => {
        res.header('Hello')
        next()
    })
    app.post('/api/auth/signup',
    [
        verifySignUp.checkDuplicateUsernameOrEmail,
        verifySignUp.checkPlanExisted
    ],
    controller.signUp
    )

    app.post('/api/auth/signin', controller.signIn)
    app.post('/api/auth/signout', controller.signOut)
}