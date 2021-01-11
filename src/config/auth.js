module.exports = {
    mustBeAuth : function(req,res,next) {
        if(req.isAuthenticated()) {
            return next();
        }
        req.flash('error_msg' , 'you need to log in to view this resource');
        res.redirect('/users/login');
    }
}