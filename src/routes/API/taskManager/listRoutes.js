import Router from 'koa-router';
import logger from '../../../services/Logs';
import { authorization } from '../../../services/Auth';
import listAPI from '../../../services/TaskManager/listAPI';
import boardAPI from '../../../services/TaskManager/boardAPI';

export const listRouter = new Router({prefix: '/lists'});

listRouter.post('/createList', async (ctx, next) => {               // any boardMember
    await authorization(ctx, async(user) => {
        await listAPI.authMember(user, ctx.request.body, async () => {
            await listAPI.createObject(ctx.request.body).then(result => {
                boardAPI.changeObject({data: {
                    lists: result._id
                }});
                ctx.body = {message: `List ${result._id} was succesfull created with code ${ctx.status = 200}`};
            })
        })
    })
    (ctx, next);
})

listRouter.post('/changeList', async (ctx, next) => {               //any boardMember
    await authorization(ctx, async(user) => {
        await listAPI.authMember(user, ctx.request.body, async () => {
            await listAPI.changeObject(ctx.request.body).then(result => {
                ctx.body = result;
            })
        })
    })
    (ctx, next);
})

listRouter.post('/archivedList', async (ctx, next) => {             //any boardMember
    await authorization(ctx, async(user) => {
        await listAPI.authMember(user, ctx.request.body, async () => {
            await listAPI.archivedObject(ctx.request.body._id).then(result => {
                ctx.body = {message: `${result._id} list was archived`};
            })
        })
    })
    (ctx, next);
})

listRouter.post('/returnListById', async (ctx, next) => {   //any boardMember
    await authorization(ctx, async(user) => {
        await listAPI.authMember(user, ctx.request.body, async () => {
            await listAPI.returnObjectById(ctx.request.body._id).then(result => {
                ctx.body = result;
            })
        })
    })
    (ctx, next);
})

listRouter.post('/removedListById', async (ctx, next) => {
    await authorization(ctx, async(user) => {
        if(user.isAdmin) {
            await listAPI.removeObject(ctx.request.body._id).then(result => {
                ctx.body = result;
            })
        }
    })
    (ctx, next);
})

listRouter.get('/testConnection', async (ctx, next) => {
    ctx.body = 'Hello nibba'
})