import { Schema } from 'mongoose';

const boardSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    projectOwner: {
        type: Schema.Types.ObjectId,
        required: true
    },
    tags: {
        type: [Schema.Types.ObjectId],
        index: true
    },
    isArchived: {
        type: Boolean,
        required: true,
        default: false
    },
    priority: {
        type: Number,
        required: true,
        default: 10
    },
    lists: [{
        name: String,
        _id: Schema.Types.ObjectId
    }]
}, {
    timestamps: true
})

export default boardSchema;