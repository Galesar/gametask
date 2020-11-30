import Router from 'koa-router';
import logger from '../../../services/Logs';
import { authorization } from '../../../services/Auth';
import boardAPI from '../../../services/TaskManager/boardAPI';
import teamAPI from '../../../services/TaskManager/teamAPI';
import projectAPI from '../../../services/TaskManager/projectAPI';

export const boardRouter = new Router({prefix: '/boards'});


/* 
    Для сравнения нужно передавать дополнительно projectOwner = objectId
    TO_DO:
    роут для назначения борды на тиму.
*/

boardRouter.post('/createBoard', async (ctx, next) => {
    await authorization(ctx, async (user) => {
        await boardAPI.authUser(ctx.request.body, user, async () => {
            await boardAPI.createObject(ctx.request.body).then(result => {
            ctx.body = {message: `Board ${result._id} was succesfull created with code ${ctx.status = 200}`}});
        })
    })
    (ctx, next)
})

boardRouter.post('/changeBoard', async (ctx, next) => {
    await authorization(ctx, async(user) => {
        await boardAPI.authUser(ctx.request.body, user, async () => {
            await boardAPI.changeObject(ctx.request.body);
        })
    })
    (ctx, next)
})

boardRouter.post('/removeBoard', async (ctx, next) => {
    await authorization(ctx, async(user) => {
        if(user.isAdmin) {
            await boardAPI.removeObject(ctx.request.body.request.body);
        }
        else ctx.status = 403;
    })
    (ctx, next)
})

boardRouter.post('/archivedBoard', async (ctx, next) => {
    await authorization(ctx, async(user) => {
        await boardAPI.authUser(ctx.request.body, user, async () => {
            await boardAPI.archivedObject(ctx.request.body);
        })
    })
    (ctx, next)
})

boardRouter.post('/getBoardById', async (ctx, next) => {
    await authorization(ctx, async(user) => {
        await boardAPI.authUser(ctx.request.body, user, async () => {
            await boardAPI.returnObjectById(ctx.request.body._id).then(result => {
                ctx.body = result;
            })
        })
    })
    (ctx, next)
})

boardRouter.post('/getBoardByTeam', async (ctx, next) => {
    await authorization(ctx, async(user) => {
        await boardAPI.authUser(ctx.request.body, user, async () => {
            await boardAPI.returnObject({teams: ctx.request.body.teamsId}).then(result => {
                ctx.body = result;
            });
        })
    })
    (ctx, next)
})

boardRouter.post('/getBoardByProject', async (ctx, next) => {
    await authorization(ctx, async(user) => {
        await boardAPI.authUser(ctx.request.body, user, async () => {
            await boardAPI.returnObject({projectOwner: ctx.request.body.projectOwnerId}).then(result => {
                ctx.body = result;
            })
        })
    })
    (ctx, next)
})

boardRouter.post('/addTeam', async (ctx, next) => {
    await authorization(ctx, async(user) => {
        await boardAPI.returnObjectById(ctx.request.body._id).then(result => {
            projectAPI.returnObjectById(result.projectOwner).then(project => {
                if(project.owner.equals(user._id)) {     // Если это создатель проекта
                    for(let i = 0; i < project.teams.length; i++) {
                        if(project.teams[i].equals(ctx.request.body.teamID)) {
                            teamAPI.changeObject({data: {
                                boards: ctx.request.body._id
                            }})
                        }
                    }
                }
            })
        })
    })
    (ctx, next)
})