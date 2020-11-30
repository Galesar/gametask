import Router from 'koa-router';
import {projectRouter} from './projectRoutes';
import {boardRouter} from './boardRoutes';
import {taskRouter} from './taskRoutes';
import {teamRouter} from './teamRoutes';
import {listRouter} from './listRoutes';

export const taskManagerRouter = new Router({prefix: '/taskManager'}); // /api/taskManager/

taskManagerRouter
            .use(projectRouter.routes())
            .use(projectRouter.allowedMethods())
            .use(boardRouter.routes())
            .use(boardRouter.allowedMethods())
            .use(taskRouter.routes())
            .use(taskRouter.allowedMethods())
            .use(teamRouter.routes())
            .use(teamRouter.allowedMethods())
            .use(listRouter.routes())
            .use(listRouter.allowedMethods());