import {Schema} from 'mongoose';

const listSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    tasks: [Schema.Types.ObjectId],
    boardOwner: {
        type: Schema.Types.ObjectId,
        required: true
    },
    isArchived: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true
})

export default listSchema;