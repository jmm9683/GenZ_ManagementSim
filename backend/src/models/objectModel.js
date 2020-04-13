import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ObjectSchema = new Schema({
    "domainID": {type: String},
    "Id": {type: String},
    "@odata.id": {type: String},
    "isNode" : {type: Boolean},
    "isEdge" : {type: Boolean},
    "jsonFile":  {type: Object},
    "updated_date": {
        type: Date,
        default: Date.now
    }
});
