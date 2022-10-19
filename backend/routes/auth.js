const rateLimit = require('express-rate-limit')
const verify = require ('../middlewares/middleware_auth/modules')
const controller = require('../controllers/auth.controller')

module.exports = (app) => {
    
    const apiLimiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    })

    app.post('/user/signup',
    [
        apiLimiter,
        verify.verifySignUp.checkDuplicateUsernameOrEmail,
        verify.verifySignUp.checkPlanExisted
    ],
    controller.userSignUp
    )

    app.post('/corporate/signup', apiLimiter, verify.verifySignUp.checkDuplicateCorporate, controller.corporateSignUp)

    app.post('/user/login', apiLimiter, controller.userSignIn)
    app.post('/corporate/login', apiLimiter, controller.corporateSignIn)

    app.post('/logout', apiLimiter, verify.authJwt.verifyToken, controller.signOut)
    app.delete('/delete_account', apiLimiter, controller.deleteAccount)
    app.patch('/update-user', apiLimiter, controller.updateAccount)
}