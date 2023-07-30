import passport from "passport";
import pkg from "mongoose";
import { Strategy as LocalStrategy, Strategy } from "passport-local";
import { Strategy as GithubStrategy } from "passport-github2";
import { userModel } from "../../DAL/MongoDB/models/users.model.js";
import { compareData, hashData } from "../../utils/utils.js";
import { addUser as addUserService } from "../../services/users.service.js";

const { ValidationError } = pkg;
// LOCAL LOGIN
passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      const user = await userModel.findOne({ email });

      if (!user) {
        return done(null, false);
      }
      const isPassword = await compareData(password, user.password);

      if (!isPassword) {
        return done(null, false);
      }

      done(null, user);
    }
  )
);

//LOCAL SIGNUP

passport.use(
  "signup",
  new Strategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const user = await addUserService(req.body);
        done(null, user);
      } catch (error) {
        console.log(error);
        done(error);
      }
    }
  )
);

//GITHUB SIGNUP
passport.use(
  "github",
  new GithubStrategy(
    {
      clientID: "Iv1.6edeecf73b3d121e",
      clientSecret: "3b22c35480b2de4026acdb47676ff594a35dd507",
      callbackURL: "http://localhost:8000/users/github",
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      const email = profile._json.email;
      const userDB = await userModel.findOne({ email });
      if (userDB) {
        done(null, false);
      }
      const newUser = {
        first_name: profile._json.login,
        last_name: profile._json.login,
        email: profile._json.email,
        password: "123",
      };
      const newUserDB = await userModel.create(newUser);
      done(null, newUserDB);
    }
  )
);

passport.serializeUser((user, done) => {
  try {
    done(null, user.id);
  } catch (error) {
    done(error);
  }
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
