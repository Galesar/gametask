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
    listOwner: {
        type: Schema.Types.ObjectId,
        required: true
    },
    boardOwner: {
        type: Schema.Types.ObjectId,
        index: true
    },
    userOwner: {
        data: {
            name: String,
            preview: String
        }
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
    url: {
        type: String,
        required: true,
        unique: true
    },
    image: String
}, {
    timestamps: true
})

export default taskSchema;