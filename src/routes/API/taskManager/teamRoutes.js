import Router from 'koa-router';
import logger from '../../../services/Logs';
import { authorization } from '../../../services/Auth';
import teamAPI from '../../../services/TaskManager/teamAPI';
import projectAPI from '../../../services/TaskManager/projectAPI';

export const teamRouter = new Router({prefix: '/teams'});

teamRouter.post('/getTeamById', async (ctx, next) => {      
    await authorization(ctx, async (user) => {
        await teamAPI.authMember(user, ctx.request.body._id, async (team) => {
            ctx.body = team;
        })(false, false);
    })
    (ctx, next)
})

teamRouter.post('/getTeam', async (ctx, next) => {
    await authorization(ctx, async (user) => {
        await teamAPI.returnObject(ctx.request.body).then(result => {
            ctx.body = result;
        })
    })
    (ctx, next)
})
 
teamRouter.post('/createTeam', async (ctx, next) => {               
    await authorization(ctx, async(user) => {
        projectAPI.returnObjectById(ctx.request.body.projectID).then(result => {
            if(result.owner.equals(user._id)) {
                teamAPI.createObject(ctx.request.body).then(result => {
                    ctx.body = {
                        message: `${result.name} team was created`
                    };
                })
            }
        })
    })
    (ctx, next);
})

teamRouter.post('/changeTeam', async(ctx, next) => {        
    await authorization(ctx, async(user) => {
        await teamAPI.authMember(user, ctx.request.body._id, async (team) => {
            await teamAPI.changeObject(ctx.request.body).then(result => {
                ctx.body = {
                    message: `${ctx.request.body.name} team was changed`
                };
            })
        })(false, true);
    })
    (ctx, next);
})

teamRouter.post('/removeTeam', async (ctx, next) => {       
    await authorization(ctx, async(user) => {
        if(user.isAdmin) {
            await teamAPI.removeObject(ctx.request.body._id).then(result => {
                ctx.body = {
                    message: `${ctx.request.body.name} team was removed`
                };
            })
        }
    })
    (ctx, next);
})

teamRouter.post('/archivedTeam', async (ctx, next) => {         
    await authorization(ctx, async(user) => {
        await teamAPI.authMember(user, ctx.request.body._id, async (team) => {
            await teamAPI.archivedObject(ctx.request.body._id).then(result => {
                ctx.body = {
                    message: `${ctx.request.body.name} team was archived`
                };
            })
        })(true, false);
    })
    (ctx, next);
})

teamRouter.post('/addMemberInTeam', async (ctx, next) => {      
    await authorization(ctx, async(user) => {
        if(user.isAdmin) {
            await teamAPI.changeObject(ctx.request.body).then(result => {        
                ctx.body = {
                    message: `user ${_id} was add in the team ${result.name}`
                };
            })
        }
    })
    (ctx, next);
})

teamRouter.post('/inviteMemberInTeam', async (ctx, next) => {   // admin or team moder
    ctx.body = 'In development'
})

teamRouter.post('/discardMemberFromTeam', async (ctx, next) => { // admin or team moder
    ctx.body = 'In development'
})