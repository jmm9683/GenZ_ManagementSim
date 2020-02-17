import mongoose from 'mongoose';
import { SystemSchema } from '../models/systemModel';

const System = mongoose.model('System', SystemSchema);

export const addNewSystem = (req, res) => {
    let newSystem = new System(req.body);

    newSystem.save((err, sys) => {
        if (err){
            res.send(err);
        }
        res.json(sys);
    });
}

export const getSystems = (req, res) => {
    System.find({}, (err, sys) => {
        if (err){
            res.send(err);
        }
        res.json(sys);
    });
}

export const getSystemWithID = (req, res) => {
    System.findOne({ Id: req.params.systemID }, (err, sys) => {
        if (err){
            res.send(err);
        }
        res.json(sys);
    });
}

export const updateSystem = (req, res) => {
    System.findOneAndUpdate({ Id: req.params.systemID }, req.body, { new: true, useFindAndModify: false }, (err, sys) => {
        if (err){
            res.send(err);
        }
        res.json(sys);
    });
}

export const deleteSystem = (req, res) => {
    System.remove({ _id: req.params.systemID }, req.body, (err, sys) => {
        if (err){
            res.send(err);
        }
        res.json({ message: 'successfully deleted contact' });
    });
}