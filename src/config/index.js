import ow from 'ow';

class Config {
    constructor(env = process.env) {
        this.env = env;

        this.loggerLevel = process.env.LOGGER_LEVEL || 'info';
        this.httpPort = 8080;
        this.loggerName = `http-server-localhost:${this.httpPort}`;
        this.connectToDB = 'mongodb+srv://uLib:S2jG3210FksK@gametask.lwjdn.gcp.mongodb.net/GameTask?retryWrites=true&w=majority';

        this.validate();
    }

    validate() {
         ow(this.httpPort, ow.number);
        //  ow(this.connectDataBase, ow.string.url);
         ow(
             this.loggerLevel,
             'env.LOGGER_LEVEL',
             ow.string.oneOf(['fatal', 'error', 'warn', 'info', 'debug', 'trace']),
           );
     }
}

export default new Config();