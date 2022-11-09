const userController = require('../controllers/user')

const routes = (app) => {
    app.route('/user')
        .get(userController.getUser);
    app.route('/user-with-cache')
        .get(userController.getUserWithRedis)
    app.route('/delete-all-caching')
        .get(userController.deleteAllDataCaching)
}

module.exports = routes