import mongoose from 'mongoose';
import userSchema from './userSchema';
import passport from 'koa-passport';
import passportLocal from 'passport-local';
import passportJwt from 'passport-jwt';
import crypto from 'crypto';
import logger from "../Logs/index";
import { authToken } from '../../routes/API/index';

const jwtStrategy = passportJwt.Strategy;
const localStrategy = passportLocal.Strategy;
const jwtSecret = 'alkesTheBest';

const userModel = mongoose.model('users', userSchema);

passport.use(new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false
}, 
    function(email, password, done) {
        userModel.findOne({email: email}, (err, user) => {
            if(err) { 
                logger.error(err);
                 return done(err, false)
                }
            logger.info(`Auth: ${email} - localStrategy`);
            checkPassword(password, email).then(result => {
                if(!user || !result) {
                    logger.info('!user');
                    logger.error(`Something went wrong, check your email or password! ${email}`);
                    return done(null, false, {message: "Something went wrong, check your email or password!"});
                }
                return done(null, user);
            })
        })
    }
))

const cookieExtractor = () => {
    let token = authToken;
    console.log('cookieExtractorToken: ' + token);
    if(token == false) return new Error(403);
    return token;
}

const jwtOptions = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: jwtSecret
}

passport.use(new jwtStrategy(jwtOptions, async (payload, done) => {
    userModel.findOne({_id: payload._id}, async (err, user) => {
        if(err) { 
            logger.error(err);
            return done(err, false);
         }
        if(user) done(null, user);
        else done(null, false);
    })
}))

export function createUser(reqBody) {
    return new Promise((resolve, reject) => {
        let reqUser = reqBody;
        if(!reqUser.password || !reqUser.email) reject(400);
        resolve(reqUser);
    }).then((result) => {
        result.salt =  crypto.randomBytes(128).toString('base64');
        return result;
    }).then((result) => {
        return new Promise((resolve, reject) => {
            crypto.pbkdf2(result.password, result.salt, 100000, 128, 'sha512', (err, hashPassword) => {
                if (err) reject(err);
                result.passwordHash = hashPassword
                resolve(result);
            })
        })
    }).then((result) => {
        return userModel.create(result, (err, user) => {
            if(err) {
                logger.error(err);
                return null;
            };
            logger.info(`${user.email} was add in the dataBase`);
        })
    }).catch((err) => {
        logger.error(err);
    })
}

export async function findUserByEmail(email) {
    try {
        return await userModel.findOne({email: email}, (err, user) => {
            if(err) { logger.error(err); throw new Error(err);}
            return user;
        })
    } catch (error) {
        
    }
}

export function authorization(ctx, callbackSucces) {
     return passport.authenticate('jwt', async function(err, user) {
        if(err) logger.error(err);
        if (!user) {
             logger.error('auth is failed');
             ctx.body = {message: 'auth is failed'};
             ctx.status = 403;
             ctx.cookies.set('refresh_token', undefined)
             ctx.redirect('/api/auth');
        } else if(checkValidToken(user, ctx))  { 
           return callbackSucces(user);
        }
    })
}

export async function getAuthTokenFromCookies(ctx) {
    let access_token;
    const refresh_token = ctx.cookies.get('refresh_token');
    if(ctx.request.header.access_token !== undefined) {
    access_token = JSON.parse(ctx.request.header.access_token);
    }
    if(access_token) return await access_token.token;
    else if (refresh_token) return await refresh_token;
    else return false;
}

export async function changeUser(user, data) {
    for (const [key, value] of Object.entries(data)) {
        if(Array.isArray(user[key])) {
          user[key] = user[key].push(value);
        }
        else user[key] = value;
    }
    await userModel.findByIdAndUpdate(user._id, user, (err, result) => {
        if(err) logger.error(err);
        return result;
    })
}

async function checkPassword(password, email) {
    return new Promise((resolve, reject) => {
        return userModel.findOne({email: email}, (err, data) => {
            if(err) {
                reject(err);
                return null;
            }
            return crypto.pbkdf2(password, data.salt, 100000, 128, 'sha512', (err, passwordHash) => {
                if (err) reject(err);
                if(passwordHash == data.passwordHash){
                    resolve(true);
                }
                else resolve(false);
            })
        })
    })
}

function checkValidToken(user, ctx) {
    const currentDate = new Date();
    const refreshToken = ctx.cookies.get('refresh_token');
    const accessToken = ctx.request.headers.access_token;
    // if(user.accessToken.token != accessToken || user.accessToken.dateTo <= currentDate) {
    //     ctx.status = 403;
    //     ctx.redirect('/api/auth/token-exchanged');
    // }
    // else if(user.refreshToken.token != refreshToken || user.refreshToken.dateTo <= currentDate) {
    //     ctx.status = 403;
    //     ctx.redirect('/api/auth');
    // }
    return true;
}