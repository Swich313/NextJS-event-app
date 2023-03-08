import mongoose from 'mongoose';

const {Schema} = mongoose;

const NewsletterSchema = new Schema({
    email: {
        type: String,
        required: true
    }
});

//prevents Mongoose from recompiling the model
module.exports = mongoose.models.Newsletter || mongoose.model('Newsletter', NewsletterSchema);