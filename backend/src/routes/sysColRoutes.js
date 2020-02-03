import { addNewSysCol, 
    getSysCols, 
    getSysColWithID, 
    updateSysCol,
    deleteSysCol
} from '../controllers/systemCollectionController'

const sysColRoutes = (app) => {
app.route('/syscol')
    .get((req, res, next) => {
        // middleware
        console.log(`Request from: ${req.originalUrl}`);
        console.log(`Request type: ${req.method}`);
        next();
    }, getSysCols)
    
    // Post endpoint
    .post(addNewSysCol);

app.route('/syscol/:sysColID')
    // get a specific contact
    .get(getSysColWithID)
    
    // updataing specific contact
    .put(updateSysCol)

    // deleting a specific contact
    .delete(deleteSysCol);
}

export default sysColRoutes;