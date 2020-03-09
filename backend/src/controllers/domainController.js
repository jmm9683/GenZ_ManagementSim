import mongoose from 'mongoose';
import { DomainSchema } from '../models/domainModel';

const Domain = mongoose.model('Domain', DomainSchema);

export const addNewDomain = (req, res) => {
    let newDomain = new Domain(req.body);

    newDomain.save((err, sys) => {
        if (err){
            res.send(err);
        }
        res.json(sys);
    });
}

export const getDomains = (req, res) => {
    Domain.find({}, (err, sys) => {
        if (err){
            res.send(err);
        }
        res.json(sys);
    });
}

export const getDomainWithID = (req, res) => {
    Domain.findOne({ Id: req.body.domainID }, (err, sys) => {
        if (err){
            res.send(err);
        }
        res.json(sys);
    });
}

export const updateDomain = (req, res) => {
    Domain.findOneAndUpdate({ Id: req.params.domainID }, req.body, { new: true, useFindAndModify: false }, (err, sys) => {
        if (err){
            res.send(err);
        }
        res.json(sys);
    });
}

export const deleteDomain = (req, res) => {
    Domain.remove({ Id: req.params.domainID }, req.body, (err, sys) => {
        if (err){
            res.send(err);
        }
        res.json({ message: 'successfully deleted contact' });
    });
}