import mongoose from 'mongoose';
import { ObjectSchema } from '../models/objectModel';

const Objects = mongoose.model('ObjectCollection', ObjectSchema);

export const addNewObject = (req, res) => {
    let newObject = new Objects(req.body);
    newObject.save({ checkKeys: false },(err, sys) => {
        if (err){
            res.json(err);
        }
        res.json(sys);
    });
}

export const getObjects = (req, res) => {
    Objects.find({}, (err, sys) => {
        if (err){
            res.send(err);
        }
        res.json(sys);
    });
}

export const getObjectWithID = (req, res) => {
    Objects.findOne({ Id: req.body.objectID }, (err, sys) => {
        if (err){
            res.send(err);
        }
        res.json(sys);
    });
}

export const updateObject = (req, res) => {
    Objects.findOneAndUpdate({ Id: req.body.objectID }, req.body, { new: true, useFindAndModify: false }, (err, sys) => {
        if (err){
            res.send(err);
        }
        res.json(sys);
    });
}

export const deleteObject = (req, res) => {
    Objects.remove({ Id: req.body.objectID }, req.body, (err, sys) => {
        if (err){
            res.send(err);
        }
        res.json({ message: 'successfully deleted System Collection' });
    });
}

export const getObjectWithDomainID = (req, res) => {
    Objects.findOne({ domainID: req.body.domainID }, (err, sys) => {
        if (err){
            res.send(err);
        }
        res.json(sys);
    });
}