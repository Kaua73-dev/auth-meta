import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "http://localhost:3000/auth/facebook/callback",
      profileFields: ["id", "displayName"] 
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, {
        profile,
        accessToken
      });
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));
