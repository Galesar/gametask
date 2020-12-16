import { Schema } from 'mongoose';

const projectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    owner: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true
    },
    teams: {
        type: [Schema.Types.ObjectId]
    },
    isArchived: {
        type: Boolean,
        required: true,
        default: false,
        index: true
    },
    background: {
        type: String,
        required: true,
        default: '/gameTask.png' 
    },
    preview: {
        type: String,
        required: true,
        default: '/gameTask.png'
    }
}, {
    timestamps: true
})

export default projectSchema;