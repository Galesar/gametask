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
            const tempDate = new Date();
            const boardUrl = `${tempDate.getSeconds()}${tempDate.getMinutes()}${tempDate.getHours()}${tempDate.getDay()}${tempDate.getMonth()}`;
            const newBoardData = { 
                name: 'Your board',
                projectOwner: ctx.request.body.projectOwner,
                url: boardUrl,
                preview: 'https://lol-skin.weblog.vc/img/wallpaper/tiles/lol-new-champion-Janna_13.jpg?1607890698',
                background: 'http://img0.reactor.cc/pics/post/full/Janna-League-of-Legends-%D1%84%D1%8D%D0%BD%D0%B4%D0%BE%D0%BC%D1%8B-ssolthss-45-4991946.jpeg'
            }
            await boardAPI.createObject(newBoardData).then(result => {
            ctx.body = result.url;
            })
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
        console.log(ctx.request.body)
        await boardAPI.authUser(ctx.request.body, user, async () => {
            await boardAPI.returnObject({url: ctx.request.body.boardUrl}).then(result => {
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
        await boardAPI.authUser(ctx.request.body, user, async (projectOwner) => {
            await boardAPI.returnObject({projectOwner: projectOwner._id}).then(result => {
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