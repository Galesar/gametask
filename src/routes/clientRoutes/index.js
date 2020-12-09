import Router from 'koa-router';
import fs from 'fs'
import path from 'path'
import util from 'util';

const readFile = util.promisify(fs.readFile);
const renderFile = (file) => {
    return readFile(path.resolve(`./client/${file}`), 'utf-8')
} 

export const clientRouter = new Router() 

clientRouter.get('/', async (ctx, next) => {
    ctx.body = await renderFile('index.html');
})

clientRouter.get('/signUp', async ctx => {
    ctx.body = await renderFile('signUp.html')
})

clientRouter.get('/login', async ctx => {
    ctx.body = await renderFile('login.html')
})

clientRouter.get('/passwordRestore', async ctx => {
    ctx.body = await renderFile('passwordRestore.html')
})

clientRouter.get('/project/:id', async ctx => {
    ctx.body = await renderFile('project/[project].html')
})

clientRouter.get('/project/:project/:board', async ctx => {
    ctx.body = await renderFile('project/[project]/[board].html')
})

clientRouter.get('/project/:project/:board/:task', async ctx => {
    ctx.body = await renderFile('project/[project]/[board]/[task].html')
})