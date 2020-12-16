import Router from 'koa-router';
import { createUser, authorization, findUserByEmail, changeUser } from '../../services/Auth';
import logger from '../../services/Logs';
import passport from 'koa-passport';
import jwt from 'jsonwebtoken';
const jwtSecret = 'alkesTheBest';

export const authRouter = new Router({prefix: '/auth'});

authRouter.get('/token-exchanged', async (ctx, next) => {
        await authorization(ctx, async (user) => {
            const payload = {
                _id: user._id,
                email: user.email
            };
            const token = jwt.sign(payload, jwtSecret);
            ctx.cookies.set('access_token', `${token}`, { maxAge: 60000 * 15, sameSite: true, overwrite: true, body: {
                access_token: token
            }});
            let dateTo = new Date();
            dateTo.setMinutes(dateTo.getMinutes() + 30);
            const accessToken = {
                token: token,
                dateTo: dateTo
            }
            await changeUser(user, {accessToken})
            const tempData = {
                id: user._id,
                access_token: accessToken
            }
            ctx.body = tempData;
           })(ctx, next);
})

authRouter.post('/login', async (ctx, next)=> {
    await passport.authenticate('local', function (err, user) {
        if(err) logger.error(err);
        if (user==false) {
            ctx.body = {message: 'Invalid User'};
            ctx.status = 403;
        } else {
            const payload = {
                _id: user._id,
                email: user.email
            };
        const token = jwt.sign(payload, jwtSecret);
        ctx.cookies.set('refresh_token', `${token}`, { maxAge: 3600000 * 24 * 15, sameSite: true, overwrite: true, body: {
            refresh_token: token
        }});

        let dateTo = new Date();
        dateTo.setDate(dateTo.getDay() + 30);
        const refreshToken = {
            token: token,
            dateTo: dateTo
        }
        changeUser(user, {refreshToken})
        ctx.redirect('/api/auth/token-exchanged');
        }
  })
  (ctx, next);
})

authRouter.get('/register', async ctx => {
    await ctx.render('register')
})

authRouter.post('/register', async (ctx, next) => {
    if(ctx.request.body.email == "" || ctx.request.body.password == "") {
        ctx.status = 400;
        const error = 'Email or password is empty!';
        ctx.body = {message: error}
        throw new Error(error);
    }
    await findUserByEmail(ctx.request.body.email).then(result => {
        if(result) {
        ctx.status = 400;
        const error = 'Email is invalid';
        ctx.body = {message: error};
        throw new Error(error);
        }
    });
    try {
        logger.info(`Register new user: ${ctx.request.body.email}`)
        await createUser(ctx.request.body);
        ctx.body = {user: ctx.request.body.email, message: 'was try add in the db'};
    }
    catch (err) {
        ctx.status = 400;
        logger.error(err);
    }(ctx, next);
})

authRouter.post('/getUserData', async (ctx, next) => {
    await authorization(ctx, async (user) => { 
        const tempUser = { 
            avatar: user.avatar, 
            email: user.email,
            nickname: user.nickname,
            isAdmin: user.isAdmin,
            projects: user.projects,
            projectsOwner: user.projectsOwner,
            teams: user.teams
        }
        ctx.body = tempUser;
    })(ctx, next)
})