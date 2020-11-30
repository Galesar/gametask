import { Schema } from 'mongoose'

export const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
        type: String,
        required: true,
        default: "/defaultAvatar.png"
    },
    passwordHash: String,
    salt: String,
    projects: {
        type: [Schema.Types.ObjectId]
    },
    projectsOwner: {
        type: [Schema.Types.ObjectId]
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    accessToken: {
        type: {
            token: String,
            dateTo: Date
        }
    },
    refreshToken: {
        type: {
            token: String,
            dateTo: Date
        }
    },
    referer: String,
    ipRegister: String,
    teams: {
        type: [Schema.Types.ObjectId]
    }
}, {
    timestamps: true
});

export default userSchema;