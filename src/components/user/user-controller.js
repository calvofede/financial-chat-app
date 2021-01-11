const userService = require('./user-service');
const { registerUser } = userService;
const User = require('./user');

const register = async(req, res, next) => {
    try {
        const user = new User(req.body);
        await registerUser(user);
        req.flash('success_msg','You have now registered!');
        res.redirect('/login');
        next();
    } catch(e) {
        console.error(e);
        res.status(500).send(e.message) && next(e);
    }
}

module.exports = {
    register
}