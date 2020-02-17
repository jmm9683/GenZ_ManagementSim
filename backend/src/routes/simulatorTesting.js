import { addNewSystem, 
    getSystems, 
    getSystemWithID, 
    updateSystem,
    deleteSystem
} from '../controllers/simulatorTestController'

const simTestRoutes = (app) => {
app.route('/simtest')
    .get((req, res, next) => {
        // middleware
        console.log(`Request from: ${req.originalUrl}`);
        console.log(`Request type: ${req.method}`);
        next();
    }, getSystems)
    
    // Post endpoint
    .post(addNewSystem);

app.route('/simtest/:systemID')
    // get a specific contact
    .get(getSystemWithID)
    
    // updataing specific contact
    .put(updateSystem)

    // deleting a specific contact
    .delete(deleteSystem);
}

export default simTestRoutes;