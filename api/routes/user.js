const userController = require('../controllers/user')

const routes = (app) => {
    app.route('/admin')
        .get(userController.admin)
    app.route('/delete')
        .post(userController.deleteUser)
    app.route('/add-user')
        .get(userController.viewAddUser)
    app.route('/add-user')
        .post(userController.addUser)
}

module.exports = routes