import { Schema } from 'mongoose';

const boardSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    background: {
        type: String,
    },
    preview: {
        type: String
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
    }],
    url: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true
})

export default boardSchema;