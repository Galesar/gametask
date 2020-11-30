import Router from 'koa-router';
import logger from '../../../services/Logs';
import { authorization } from '../../../services/Auth';
import taskAPI from '../../../services/TaskManager/taskAPI';
import listAPI from '../../../services/TaskManager/listAPI';

export const taskRouter = new Router({prefix: '/tasks'});

// taskRouter.use(async (ctx, next) => {
//     const data = {
//         name: 'Test task',
//         description: 'Kill all furry',
//         list: '5f989b850d01da13d0404a53',
//         projectOwner: '5f935ab82c6348033c679ccb',
//         boardOwner: '5f981101d6f4bb1ea83e6c46',
//         userOwner: '5f7fa874e5d6ed290cd16ae9',
//         priority: 100,
//         tags: ['development']
//     };
//     await taskAPI.createObject(data);
//     return next();
// })

/*
userAuth
Как и с листом, проверка юзера на причастность к тиме, которая имеет доступ к борде.
Тобишь, получаем id борды, получаем борду, сравниваем тимы, отдаём разрешение на работу с тасками.

ctx.request.body = { 
    boardOwner: _id,
    _id: _id,
    data = {
        ...
    }
}
*/

taskRouter.post('/createTask', async (ctx, next) => {   // any board member
    await authorization(ctx, async (user) => {
        await taskAPI.authMember(user, ctx.request.body, async () => {
            await taskAPI.createObject(ctx.request.body).then(result => {
                listAPI.changeObject({_id: ctx.request.body.listID, data: {
                    tasks: result._id
                }});
                ctx.body = {
                    message: `${result.name} task was created`
                };
            })
        })
    })
    (ctx, next);
})

taskRouter.post('/changeTask', async (ctx, next) => {
    await authorization(ctx, async (user) => {
        await taskAPI.authMember(user, ctx.request.body, async() => {
            await taskAPI.changeObject(ctx.request.body).then(result => {
                ctx.body = {
                    message: `${result.name} task was changed`
                };
            })
        })
    })
    (ctx, next);
})

taskRouter.post('/archivedTask', async (ctx, next) => {
    await authorization(ctx, async (user) => {
        await taskAPI.authMember(user, ctx.request.body, async() => {
            await taskAPI.archivedObject(ctx.request.body._id).then(result => {
                ctx.body = {
                    message: `${result.name} task was archived`
                };
            })
        })
    })
    (ctx, next);
})

taskRouter.post('/removeTask', async (ctx, next) => {
    await authorization(ctx, async (user) => {
        if(user.isAdmin) {
            await taskAPI.removeObject(ctx.request.body._id).then(result => {
                ctx.body = {
                    message: `${result.name} task was removed`
                };
            })
        }
    })
    (ctx, next);
})

taskRouter.post('/getTaskByUserOwner', async (ctx, next) => {
    await authorization(ctx, async (user) => {
        await taskAPI.authMember(user, ctx.request.body, async () => {
            const data = {
                userOwner: ctx.request.body.userOwner
            }
            await taskAPI.returnObject(data).then(result => {
                ctx.body = result
            })
        })
    })
    (ctx, next);
})

taskRouter.post('/getTaskById', async (ctx, next) => {
    await authorization(ctx, async (user) => {
        taskAPI.authMember(user, ctx.request.body, async () => {
            await taskAPI.returnObjectById(ctx.request.body._id).then(result => {
                ctx.body = result
            })
        })
    })
    (ctx, next);
})

taskRouter.get('/testConnection', async (ctx, next) => {
    await authorization(ctx, (user) => {
        ctx.body = user;
    })
    (ctx, next)
})