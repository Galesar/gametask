import { Schema } from 'mongoose';

const taskSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    comments: {
        type: [Object]
    },
    list: {
        type: Schema.Types.ObjectId,
        required: true
    },
    boardOwner: {
        type: String,
        index: true
    },
    userOwner: {
        type: String,
        index: true
    },
    priority: {
        type: Number,
        required: true,
        default: 10
    },
    tags: {
        type: [String],
        index: true
    },
    isArchived: {
        type: Boolean,
        required: true,
        default: false
    },
    image: String
}, {
    timestamps: true
})

export default taskSchema;