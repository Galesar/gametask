import {apiFacade} from './index';
import mongoose from 'mongoose';
import listSchema from './Schemas/listSchema';
import boardAPI from './boardAPI';

const objectModel = mongoose.model('list', listSchema);
// авторизация: ищем лист, смотрим boardOwner, смотрим boardOwner.Teams.
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

const listAPI = new ListAPI(objectModel);

export default listAPI;