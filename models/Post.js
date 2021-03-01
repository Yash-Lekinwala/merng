import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    body: String,
    username: String,
    comments: [
        {
            body:String,
            username: String,
            createdAt: {
                type: Date,
                default: new Date(),
            },
        }
    ],
    likes: [
        {
            username: String,
            createdAt: {
                type: Date,
                default: new Date(),
            },
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

export default mongoose.model('Post', postSchema);