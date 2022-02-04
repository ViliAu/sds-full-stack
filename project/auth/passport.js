const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    secretOrKey: process.env.SECRET
}

module.exports = function (passport) {
    passport.use(new JwtStrategy(options, async (payload, done) => {
        try {
            const user = await User.getUserById(payload._id);
            if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        }
        catch(e) {
            console.log(e);
            return done(null, false);
        }
    }));
}