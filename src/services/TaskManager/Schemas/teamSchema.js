import { Schema } from 'mongoose';

const teamSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    members: {
        type: [{
            email: Schema.Types.String,
            _id: Schema.Types.ObjectId,
            owner: {
                type: Boolean,
                required: true,
                default: false
            },
            moderator: {
                type: Boolean,
                required: true,
                default: false,
            }
        }],
        required: true
    },
    projects: {
        type: [Schema.Types.ObjectId]
    },
    boards: {
        type: [Schema.Types.ObjectId]
    },
    description: {
        type: String,
        default: 'You are the best team in the world!'
    }
})

export default teamSchema;