
export const ensureAuthenticated = (role) => {
    return function(req, res, next) {
        if (req.isAuthenticated()) {
            if (req.user.role === role) {
                return next();
            } else {
                res.redirect("/unauthorized");
            }
        } else {
            res.redirect("/");
        }
    }
}