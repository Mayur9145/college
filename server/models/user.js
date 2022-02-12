import mongoose from 'mongoose';

const userSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    resetPasswordLink: {
        data: String,
        default: ''
    },
    id: {
        type: String,

    },
    verified: {
        type: Boolean
    }
})
export default mongoose.model("User", userSchema);