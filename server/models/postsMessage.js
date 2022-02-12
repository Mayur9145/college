import mongoose from 'mongoose';
// const { Schema } = mongoose;


const postSchema = mongoose.Schema({

    //creator: { type: String, default: '' },
    type: {
        type: String
    },
    creator: {
        type: String

    },
    title: {
        type: String,
        default: ''
    },
    message: {
        type: String,
        default: ''
    },
    name: String,

    tags: [String],
    selectedFile: String,
    likes: {
        type: [String],
        default: [],

    },

    createdAt: {
        type: Date,
        default: new Date()
    },

});


const PostMessage = mongoose.model('PostMessage', postSchema);



export default PostMessage;