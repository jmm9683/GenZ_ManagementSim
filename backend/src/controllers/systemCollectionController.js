import mongoose from 'mongoose';
import { SystemCollectionSchema } from '../models/systemCollectionModel';

const SysCol = mongoose.model('SystemCollection', SystemCollectionSchema);

export const addNewSysCol = (req, res) => {
    let newSysCol = new SysCol(req.body);
    console.log(newSysCol)
    newSysCol.save((err, syscol) => {
        if (err){
            res.send(err);
        }
        res.json(syscol);
    });
}

export const getSysCols = (req, res) => {
    SysCol.find({}, (err, syscol) => {
        if (err){
            res.send(err);
        }
        res.json(syscol);
    });
}

export const getSysColWithID = (req, res) => {
    SysCol.findById(req.params.sysColID, (err, syscol) => {
        if (err){
            res.send(err);
        }
        res.json(syscol);
    });
}

export const updateSysCol = (req, res) => {
    SysCol.findOneAndUpdate({ _id: req.params.sysColID }, req.body, { new: true, useFindAndModify: false }, (err, syscol) => {
        if (err){
            res.send(err);
        }
        res.json(syscol);
    });
}

export const deleteSysCol = (req, res) => {
    SysCol.remove({ _id: req.params.sysColID }, req.body, (err, syscol) => {
        if (err){
            res.send(err);
        }
        res.json({ message: 'successfully deleted System Collection' });
    });
}