import {apiFacade} from './index';
import mongoose from 'mongoose';
import listSchema from './Schemas/listSchema';
import boardAPI from './boardAPI';

const objectModel = mongoose.model('list', listSchema);
// авторизация: ищем лист, смотрим boardOwner, смотрим  board.teams
// Сравниваем user.Teams и boardOwner.Teams

// data = { 
//     boardOwner: _id,
//     _id: _id,
//     listOwner: _id,
//     data = {
//         ...
//}


class ListAPI extends apiFacade{
    async authMember(user, data, callback) {
        await boardAPI.returnObject({url: data.boardUrl}).then(result => {
            // for(let i = 0; i < result.teams.length; i++) {
            //     for (let j = 0; j < user.teams.length; j++) {
            //         if(result.teams[i].equals(user.teams[j])) {
            //             return callback();
            //         }
            //     }
            // }\
            return callback(result[0])
        })
    }
}

const listAPI = new ListAPI(objectModel);

export default listAPI;