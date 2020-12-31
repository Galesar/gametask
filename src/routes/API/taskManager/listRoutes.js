import Router from 'koa-router';
import logger from '../../../services/Logs';
import { authorization } from '../../../services/Auth';
import listAPI from '../../../services/TaskManager/listAPI';
import boardAPI from '../../../services/TaskManager/boardAPI';

export const listRouter = new Router({prefix: '/lists'});

listRouter.post('/createList', async (ctx, next) => {               // any boardMember
    await authorization(ctx, async(user) => {
        await listAPI.authMember(user, ctx.request.body, async (board) => {
            const defaultData = {
                name: 'Your List',
                boardOwner: board._id
            };
            await listAPI.createObject(defaultData).then(async result => {
                const resultId = result[0]._id
                await boardAPI.changeObject({
                    _id: board._id,
                    data: {
                        lists: resultId
                }});
                ctx.body = {message: `List ${result[0]._id} was succesfull created with code ${ctx.status = 200}`};
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

listRouter.post('/returnListsByBoard', async (ctx, next) => {
    await authorization(ctx, async(user) => {
        await listAPI.authMember(user, ctx.request.body, async (boardOwner) => {
            await listAPI.returnObject({boardOwner: boardOwner._id}).then(result => {
                ctx.body = result
            })
        })
    })
    (ctx, next)
})