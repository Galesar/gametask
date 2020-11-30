import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import koaStatic from 'koa-static';
import koaSend from 'koa-send';
import render from 'koa-ejs';
import path from 'path';
import logger from './services/Logs';
import { router } from './routes';
import mongoose from 'mongoose';
import config from './config';
import passport from 'koa-passport';
import koaCors from 'koa-cors';

mongoose.connect(config.connectToDB, {useNewUrlParser: true});

const app = new Koa();

render(app, {
  root: path.join(__dirname, 'frontend/pages'),
  layout: false,
  viewExt: 'html',
  cache: false,
  debug: false
});


app.proxy = true;
app.silent = false;

app.use(async (ctx, next)=> {
    logger.trace({ req: ctx.req, date: new Date()});
    try {
        await next();
    }
    catch (err) {
        logger.warn({ req: ctx.req, error: err, date: new Date()});
    }
});

app.use(koaCors())
app.use(bodyParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(router.routes()).use(router.allowedMethods());
app.use(koaStatic(path.join(process.cwd(), 'src', 'frontend', '.next', 'server'), {
}),);

// app.use(koaStatic(path.join(process.cwd(), 'src', 'frontend', 'dist'), {
//         immutable: true
//     }),
// );

// app.use(ctx =>
//     koaSend(ctx, path.join('src', 'frontend', 'dist', 'index.html'), {
//         // maybe add smth
//     }),
//   );

app.on('error', (err, ctx) => {
    if (err.logged || ctx.status >= 500) {
      logger.error({
        err,
        req: ctx.req,
        res: ctx.res,
      });
    }
  });

export default app;