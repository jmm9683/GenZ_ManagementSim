import { addNewSystem, 
    getSystems, 
    getSystemWithID, 
    updateSystem,
    deleteSystem
} from '../controllers/systemController'

const sysRoutes = (app) => {
app.route('/system')
    .get((req, res, next) => {
        // middleware
        console.log(`Request from: ${req.originalUrl}`);
        console.log(`Request type: ${req.method}`);
        next();
    }, getSystems)
    
    // Post endpoint
    .post(addNewSystem);

app.route('/system/:systemID')
    // get a specific contact
    .get(getSystemWithID)
    
    // updataing specific contact
    .put(updateSystem)

    // deleting a specific contact
    .delete(deleteSystem);
}

export default sysRoutes;