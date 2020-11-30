import Router from 'koa-router';
import { authRouter } from './auth';
import { taskManagerRouter } from './taskManager';
import {getAuthTokenFromCookies} from '../../services/Auth';

export const apiRouter = new Router({prefix: '/api'});

apiRouter.use(async (ctx, next) => {
    await getAuthTokenFromCookies(ctx)
        .then((result) => {
            let authToken = result;
            exports.authToken = authToken;
        });
    return next();
})

apiRouter
    .use(authRouter.routes())
    .use(authRouter.allowedMethods())
    .use(taskManagerRouter.routes())
    .use(taskManagerRouter.allowedMethods());