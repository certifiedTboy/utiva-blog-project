import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import { GITHUB_OAUTH_CLIENT_ID, 
//   GITHUB_OAUTH_CALLBACK_URL,
GITHUB_OAUTH_SECRET, } from "../lib/constants.js";
import User from "../users/user.model.js";
passport.use(new GitHubStrategy({
    clientID: GITHUB_OAUTH_CLIENT_ID,
    clientSecret: GITHUB_OAUTH_SECRET,
    callbackURL: "http://localhost:3000/api/v1/auth/github/callback",
}, async (accessToken, refreshToken, profile, done) => {
    try {
        console.log(accessToken);
        console.log(refreshToken);
        console.log(profile);
        const email = profile?.emails?.[0]?.value;
        if (!email) {
            return done(new Error("GitHub account has no public email."));
        }
        let user = await User.findOne({ email });
        if (!user) {
            const nameParts = profile.displayName?.split(" ") || [
                profile.username,
                "",
            ];
            const firstName = nameParts[0];
            const lastName = nameParts.slice(1).join(" ") || firstName;
            user = await User.create({
                email,
                firstName,
                lastName,
                picture: profile.photos?.[0]?.value,
                isVerified: true, // Email from GitHub is considered verified
            });
        }
        return done(null, user);
    }
    catch (error) {
        return done(error);
    }
}));
passport.serializeUser((user, done) => {
    done(null, user._id);
});
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    }
    catch (error) {
        done(error);
    }
});
export default passport;
