import Router from 'koa-router';
import { billingRouter } from './billing';
import { apiRouter } from './API';


export const router = new Router();

router
    .use(apiRouter.routes())
    .use(apiRouter.allowedMethods())
    .use(billingRouter.routes())
    .use(billingRouter.allowedMethods());