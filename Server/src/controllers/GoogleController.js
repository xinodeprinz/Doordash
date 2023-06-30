import { Strategy } from "passport-google-oauth20";
import passport from "passport";

export const googleStrategy = new Strategy(
  {
    clientID: process.env.GOOGLE_CLIENT,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK,
  },
  (accessToken, refreshToken, profile, done) => {
    // Use the profile information to create or update a user account
    console.log({ profile, accessToken, refreshToken, done });
    done(null, profile);
  }
);

passport.use(googleStrategy);
