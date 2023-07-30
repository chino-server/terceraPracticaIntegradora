import passport from "passport";

export const registerUser = async (req, res, next) => {
  passport.authenticate("signup", { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).json(info);
    }
    req.logIn(user, (error) => {
      if (error) return next(error);
      res.redirect("/");
    });
  })(req, res, next);
};
