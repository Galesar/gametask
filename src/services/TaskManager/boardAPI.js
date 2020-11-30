import {apiFacade} from './index';
import boardSchema from './Schemas/boardSchema';
import mongoose from 'mongoose';
import logger from '../Logs';
import projectAPI from './projectAPI';


const objectModel = mongoose.model('board', boardSchema);

class BoardAPI extends apiFacade{
    async authUser(data, user, callback) {
        await projectAPI.returnObjectById(data.projectOwner).then(async result => {
            for(let i = 0; i < user.teams.length; i++) {
                for (let j = 0; j < result.teams.length; j++) {
                    if(user.teams[i].equals(result.teams[j])) {
                        await callback();
                    }
                }
            }
        })
    }
}

const boardAPI = new BoardAPI(objectModel);

export default boardAPI;