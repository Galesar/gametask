import {apiFacade} from './index';
import projectSchema from './Schemas/projectSchema';
import mongoose from 'mongoose';
import logger from '../Logs';

const objectModel = mongoose.model('project', projectSchema);
class ProjectAPI extends apiFacade {

    async getUserOwnerProjectsByUserId(_id) {
        return await this.objectModel.find({owner: _id}, (err, data) => {
            if(err) logger.error(err);
            return data;
        })
    }

    async authUser(ctx, user, callback) {
        for(let i = 0; i < user.projects.length; i++) {
            if(user.projects[i] == ctx.request.body._id || user.isAdmin == true) {
                await callback(user);
            }
        }
    }

    async getUserProjects(projects) {
       const projectsArray = [];
       for (let i = 0; i < projects.length; i++) {
        let tempData = await this.returnObjectById(projects[i]).then(result => {
            return result
        })
        projectsArray.push(tempData);
       }
       return projectsArray;
    }
}

const projectAPI = new ProjectAPI(objectModel)
export default projectAPI;