import Router from 'koa-router';
import logger from '../../../services/Logs';
import { authorization } from '../../../services/Auth';
import taskAPI from '../../../services/TaskManager/taskAPI';
import listAPI from '../../../services/TaskManager/listAPI';
import mongoose from 'mongoose';

export const taskRouter = new Router({prefix: '/tasks'});

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
        await taskAPI.authMember(user, ctx.request.body, async (board) => {
            const tempDate = new Date();
            const taskUrl = `${tempDate.getSeconds()}${tempDate.getMinutes()}${tempDate.getHours()}${tempDate.getDay()}${tempDate.getMonth()}`;
            const tempObject = { 
                name: 'Your task', 
                description: 'Hey, enter your desctiption here.',
                listOwner: ctx.request.body.listID,
                boardOwner: board._id,
                url: taskUrl
            }
            await taskAPI.createObject(tempObject).then(result => {
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
            await taskAPI.returnObject({url: ctx.request.body.taskUrl}).then( async result => { 
                await taskAPI.changeObject({
                    _id: result[0]._id,
                    data: ctx.request.body.data
                }).then(result => {
                    ctx.body = {
                        message: `${result[0].name} task was changed`
                    };
                })
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

taskRouter.post('/getTasksByListOwner', async (ctx, next) => {
    await authorization(ctx, async(user) => {
        await taskAPI.authMember(user, ctx.request.body, async () => {
            await taskAPI.returnObject({listOwner: new mongoose.Types.ObjectId(ctx.request.body.listOwner)}).then(result => {
                console.log(result);
                ctx.body = result;
            })
        })
    })
    (ctx, next)
})

taskRouter.post('/getTaskByUrl', async (ctx, next) => {
    await authorization(ctx, async(user) => {
        await taskAPI.authMember(user, ctx.request.body, async () => {
            await taskAPI.returnObject({url: ctx.request.body.taskUrl}).then(result => {
                console.log(result);
                ctx.body = result;
            })
        })
    })
    (ctx, next)
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