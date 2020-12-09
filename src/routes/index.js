import Router from 'koa-router';
import { billingRouter } from './billing';
import { apiRouter } from './API';
import {clientRouter} from './clientRoutes';

export const router = new Router();

router
    .use(apiRouter.routes())
    .use(apiRouter.allowedMethods())
    .use(billingRouter.routes())
    .use(billingRouter.allowedMethods())
    .use(clientRouter.routes())
    .use(clientRouter.allowedMethods())