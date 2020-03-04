import mongoose from 'mongoose';
import { LinkSchema } from '../models/linkModel';

const Link = mongoose.model('Link', LinkSchema);

export const addNewLink = (req, res) => {
    let newLink = new Link(req.body);

    newLink.save((err, sys) => {
        if (err){
            res.send(err);
        }
        res.json(sys);
    });
}

export const getLinks = (req, res) => {
    Link.find({}, (err, sys) => {
        if (err){
            res.send(err);
        }
        res.json(sys);
    });
}

export const getLinkWithID = (req, res) => {
    Link.findOne({ link: req.body.link }, (err, sys) => {
        if (err){
            res.send(err);
        }
        res.json(sys);
    });
}

export const updateLink = (req, res) => {
    Link.findOneAndUpdate({ link: req.body.link }, req.body, { new: true, useFindAndModify: false }, (err, sys) => {
        if (err){
            res.send(err);
        }
        res.json(sys);
    });
}

export const deleteLink = (req, res) => {
    Link.deleteOne({ _id: req.body._id }, req.body, (err, sys) => {
        if (err){
            res.send(err);
        }
        res.json({ message: 'successfully deleted contact' });
    });
}

export const getAllLinkWithID = (req, res) =>{
    Link.find({ link: req.body.link }, (err, sys) => {
        if (err){
            res.send(err);
        }
        res.json(sys);
    });
}