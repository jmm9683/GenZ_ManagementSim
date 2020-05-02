import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const DomainSchema = new Schema({
    "Id": {
        type: String, unique: true, required : true
    },
    "updated_date": {
        type: Date,
        default: Date.now
    }
});
