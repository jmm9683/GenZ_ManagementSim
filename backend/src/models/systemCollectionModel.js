import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const SystemCollectionSchema = new Schema({
    "jsonFile":   Schema.Types.Mixed
});
