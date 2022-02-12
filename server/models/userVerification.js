import mongoose from 'mongoose';

const userVerificationSchema = mongoose.Schema({

    userId: {
        type: String,

    },
    uniqueString: {
        type: String,

    },
    createdAt: {
        type: Date
    },
    expiresAt: {
        type: Date
    }

})
export default mongoose.model("userVerification", userVerificationSchema);