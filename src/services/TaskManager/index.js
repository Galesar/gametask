import logger from '../Logs';

export class apiFacade{
    constructor(objectModel) {
        this.objectModel = objectModel
    }

    /**
     * @param  {object} reqData
     */
    createObject(...reqData) {
        return new Promise((resolve, reject) => {
            return this.objectModel.create(reqData, (err, data) => {
                if(err) {
                    logger.error(err); 
                    reject(err);
                };
                logger.info(`${data._id} was add in the DB`);
                resolve(data);
            })
        })
    }

    removeObject(objectID) {
        this.objectModel.findByIdAndRemove(objectID, (err, data) => {
            if(err) {
                logger.error(err);
                throw new Error(err);
            }
            logger.info(`${data._id} was removed from DB`);
        })
    }

    /**
     * @param  {object} reqData { _id: objectId, data: { ... }}
     * @param  {array} dataMap  [ [ '0', {reqData} ] ] 
     */

    changeObject(...reqData) {
        this.objectModel.findOne({_id: reqData[0]._id}, (err, data) => {
            if(err) logger.error(err);
            const dataMap = Object.entries(reqData);
            for (const [key, value] of Object.entries(dataMap[0][1].data)) {
                if(Array.isArray(data[key])) {
                    data[key] = data[key].push(value);
                  }
                  else data[key] = value;
            }
            this.objectModel.findByIdAndUpdate(data._id, data, (err) => {
                if(err) logger.error(err);
                logger.info(`${data._id} was changed in DB`);
            });
        })
    }

    returnObjectById(_id) {
        return this.objectModel.findById(_id, (err, data) => {
            if (err) logger.error(err);
            return data;
        })
    }

    returnObject(object) {
        return this.objectModel.find(object, (err, data) => {
            if (err) logger.error(err);
            return data;
        })
    }
    
    archivedObject(_id) {
        let data = {
            _id: _id,
            data: {
                isArchived: true   
            }
        };
        this.changeObject(data);
        logger.info(`${data._id} was archived`);
    }
}