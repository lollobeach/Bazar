const { authJwt } = require ('../middlewares/middleware_auth/modules')
const controller = require('../controllers/user.controller')

module.exports = (app) => {
    app.use((req,res,next) => {
        res.header('Hello User')
        next()
    })

    app.get('/api/test/:username/free-plan', [authJwt.verifyToken, authJwt.isFreePlan],controller.freePlan)

    app.get('/api/test/:username/cheap-plan', [authJwt.verifyToken, authJwt.isCheapPlan], controller.cheapPlan)

    app.get('/api/test/:username/premium-plan', [authJwt.verifyToken, authJwt.isPremiumPlan], controller.premium)
}