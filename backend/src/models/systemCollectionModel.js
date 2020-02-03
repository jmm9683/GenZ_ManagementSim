import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const SystemCollectionSchema = new Schema({
    "@odata.context": {
        type: String
    }, 
    "@odata.id": {
        type: String
    },
    "@odata.type": {
        type: String
    },
    "Name": {
        type: String
    },
    
    "Links": {
        "Members@odata.count":{
            type: Number
        },
        "Members": [{
            "@odata.id": {
                type: String
            }
            }]
    }
});
