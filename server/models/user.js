import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true,
        default: "https://res.cloudinary.com/geekysrm/image/upload/v1542221619/default-user.png"
    }
});

export default mongoose.model('users', UserSchema)