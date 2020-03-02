import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const LinkSchema = new Schema({
    "link": {
        type: String
    },
    "updated_date": {
        type: Date,
        default: Date.now
    }
});