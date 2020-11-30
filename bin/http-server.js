import gracefulShutdownMix from 'http-shutdown';
import config from '../src/config';
import logger from '../src/services/Logs';
import httpServerApp from '../src/server';

function onListen() {
    logger.info({
        message: ` ==== HTTP server succesfull run on http://localhost:${config.httpPort} ==== `
    }) 
    console.log(`==== HTTP server succesfull run on port: ${config.httpPort} ====`);
}

const nativeHttpSever = httpServerApp.listen(config.httpPort, onListen);
const serverWithShutdown = gracefulShutdownMix(nativeHttpSever);

process.on('SIGINT', () => {
    logger.info({message: 'Start Shutdown HttpServer', date: new Date()});

    const shutdownCallBackErr = err => {
        if(err) {
            logger.error(err);
            process.exit(1);
        }

        process.exit(0);
    };

    const timer = setTimeout(() => {
        console.log("Force shutdown http server by timeout");
        serverWithShutdown.forceShutdown(err => shutdownCallbackErr(err));
    }, 4000);

    serverWithShutdown.shutdown(err => {
        clearTimeout(timer);
        shutdownCallBackErr(err);
    });
});