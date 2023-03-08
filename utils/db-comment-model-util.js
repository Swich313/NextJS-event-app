import mongoose from 'mongoose';

const {Schema} = mongoose;

const CommentSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    eventId: {
        type: String,
        required: true
    }
});

//prevents Mongoose from recompiling the model
module.exports = mongoose.models.Comment || mongoose.model('Comment', CommentSchema);