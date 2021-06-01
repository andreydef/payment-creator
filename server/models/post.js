import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    text: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    photo: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('post', PostSchema)