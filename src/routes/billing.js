import Router from 'koa-router';

export const billingRouter = new Router();

billingRouter.get('/billing/embedded-view/finish/:finishType', async ctx => {
    ctx.body = {
        message: "Billing page"
    }
})