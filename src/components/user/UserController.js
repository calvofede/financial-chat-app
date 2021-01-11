const userService = require('./UserService');
const { registerUser } = userService;

const register = async(req, res, next) => {
    try {
        const { name, email, password, password2 } = req.body;
        
        if (password != password2)
            throw new Error('password confirmation wrong!');

        await registerUser(name, email, password);
        req.flash('success_msg','You have now registered!');
        res.redirect('/users/login');
        next();
    } catch(e) {
        console.error(e);
        res.status(500).send(e.message) && next(e);
    }
}

const logout = async(req, res, next) => {
    req.logout();
    res.redirect('/users/login'); 
}

module.exports = {
    register,
    logout
}