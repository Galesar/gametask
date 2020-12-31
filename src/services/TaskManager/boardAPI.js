import {apiFacade} from './index';
import boardSchema from './Schemas/boardSchema';
import mongoose from 'mongoose';
import logger from '../Logs';
import projectAPI from './projectAPI';


const objectModel = mongoose.model('board', boardSchema);

class BoardAPI extends apiFacade{
    async authUser(data, user, callback) {
        await projectAPI.returnObject({url: data.projectUrl}).then(async result => {
            for(let i = 0; i < user.teams.length; i++) {
                for (let j = 0; j < result[0].teams.length; j++) {
                    if(user.teams[i].equals(result[0].teams[j])) {
                        await callback(result[0]);
                    }
                }
            }
        })
    }
}

const boardAPI = new BoardAPI(objectModel);

export default boardAPI;