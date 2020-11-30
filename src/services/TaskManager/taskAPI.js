import {apiFacade} from './index';
import taskSchema from './Schemas/taskSchema';
import mongoose from 'mongoose';
import boardAPI from './boardAPI';

const objectModel = mongoose.model('task', taskSchema);

// data = { 
//     boardOwner: _id,
//     _id: _id,
//     listOwner: _id,
//     data = {
//         ...
//}

class TaskAPI extends apiFacade{
    async authMember(user, data, callback) {
        await boardAPI.returnObjectById(data.boardOwner).then(result => {
            for(let i = 0; i < result.teams.length; i++) {
                for (let j = 0; j < user.teams.length; j++) {
                    if(result.teams[i].equals(user.teams[j])) {
                        console.log(`${user.teams[j]} | ${result.teams[i]}`)
                        return callback();
                    }
                }
            }
        })
    }
}

const taskAPI = new TaskAPI(objectModel);
export default taskAPI;

