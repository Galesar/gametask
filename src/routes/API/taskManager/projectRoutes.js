import Router from 'koa-router';
import logger from '../../../services/Logs';
import { authorization, changeUser } from '../../../services/Auth';
import projectAPI from '../../../services/TaskManager/projectAPI';
import teamAPI from '../../../services/TaskManager/teamAPI';

export const projectRouter = new Router({prefix: '/projects'});   


projectRouter.post('/getProjectById', async (ctx, next) => {
    await authorization(ctx, async (user) => {
        await projectAPI.authUser(ctx, user, async () => {
            await projectAPI.returnObjectById(ctx.request.body._id).then(result => {
                ctx.body = result;
            });
        })
    })
    (ctx, next);
});

projectRouter.post('/archivedProject', async (ctx, next) => {
    await authorization(ctx, async (user) => {
        await projectAPI.authUser(ctx, user, async () => {
            if(user.projectOwner.equals(ctx.request.body._id)) {
                await projectAPI.archivedObject(ctx.request.body._id).then(result => {
                    ctx.body = `${result.name} project was archived`;
                });
            }
        })
    })
    (ctx, next);
});

projectRouter.post('/createProject', async (ctx, next) => {
    await authorization(ctx, async(user) => {
        await projectAPI.createObject(ctx.request.body).then(async result => {
            await changeUser(user, {
                projectsOwner: result[0]._id,
                projects: result[0].id
            });
            await teamAPI.changeObject({teams: result._id});
            ctx.body = {message: `${result[0].name} project was created`};
        });
    })
    (ctx, next);
});

projectRouter.post('/removeProject', async (ctx, next) => {
    await authorization(ctx, async (user) => {
            if(user.isAdmin == true) {
            await projectAPI.removeObject(ctx.request.body._id).then(result => {
                ctx.body = `${result.name} project was removed`;
            });
        }
        else ctx.status = 404;
    })
    (ctx, next);
});

projectRouter.get('/getUserProjects', async (ctx, next) => {
    await authorization(ctx, async (user) => {
        await projectAPI.getUserProjectsByUserId(user._id).then(result => {
            let data = [];
            for(let i = 0; i < result.length; i++) {
                if(result[i].isArchived == false) {
                    data.push(result[i]);
                }
            }
            ctx.body = {
                userID: user._id,
                data: data
            };
        })
    })(ctx, next);
})

projectRouter.get('/changeProjectById', async (ctx, next) => {
    await authorization(ctx, async (user) => {
        await projectAPI.authUser(ctx, user, async () => {
            await projectAPI.changeObject(ctx.request.body).then(result => {
                ctx.body = `${result.name} project was changed`;
            });
        })
    })
    (ctx, next);
});

projectRouter.get('/testConnection', async (ctx, next) => {
    ctx.status = 200;
    ctx.body = {message: 'Test Connection'};
})