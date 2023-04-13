import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
    { 
        title: String,
        name: String,
        message: String,
        likeCount: {
            type: [String],
            default: []
        },
        tags: [String],
        selectedFile: String,
        createdAt: {
            type: Date,
            default: new Date()
        },
        creator: String
    }
);

export default mongoose.model('postMessages', postSchema);