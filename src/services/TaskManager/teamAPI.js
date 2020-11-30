import {apiFacade} from './index';
import teamSchema from './Schemas/teamSchema';
import mongoose from 'mongoose';

const objectModel = mongoose.model('team', teamSchema);
class TeamAPI extends apiFacade {

    async inviteMember (teamId, userId) {
        // отправляет с помощью mailAgent ссылку приглос в тиму на почту
        // Переход по ссылке запускает функцию changeObject, где присваивает объекту team в массив _id нового юзхера.
        // А также юзеру присваивает _id команды в массив projects.
        return null;
    }
    // если юзер является мембером И юзер является админом И является модератором или админом(reqData = false or true)
    authMember(user, teamId, callback) {
        return async (owner = false, moderator = false ) => {
        await this.returnObjectById(teamId).then(async result => {
            for(let i = 0; i < result.members.length; i++) {
                if(
                    result.members[i]._id.equals(user._id) ||
                    result.members[i].owner == owner &&
                    result.members[i].moderator == moderator ||
                    user.isAdmin == true) {
                        await callback(result);
                }
            }
        })
    }
}

    async removeMember(teamId, userId){
        /* 
        1. Найти тиму
        2. Получить массив юзхеров
        3. Удалить нужного юзхера
        4. Сохранить объект
    
        см. changeObject
        */
       return null;
    }
    
    async addTeamUser () {
        // При назначении таска, таск также должен назначатся не только на юзхера, но и на его тиму.
        return null;
    }
}

const teamAPI = new TeamAPI(objectModel);

export default teamAPI;