import { addNewObject, 
    getObjects, 
    getObjectWithID, 
    updateObject,
    deleteObject,
    getObjectWithDomainID,
    getObjectWith,
    getNodes
} from '../controllers/objectController'

const objectRoutes = (app) => {

app.route('/object')
    .get((req, res, next) => {
        // middleware
       // console.log(`Request from: ${req.originalUrl}`);
      //  console.log(`Request type: ${req.method}`);
        next();
    }, getObjects)
    
    // Post endpoint
    .post(addNewObject);

app.route('/object/1')
    // get a specific contact
    .get(getObjectWithID)
    
    // updataing specific contact
    .put(updateObject)

    // deleting a specific contact
    .delete(deleteObject);

app.route('/object/search')
    // get an object based on _id
    .post(getObjectWith);

app.route('/object/2')
    //see if domainID exists
    .get(getObjectWithDomainID);

app.route('/object/isNode')
    .get(getNodes);

}

export default objectRoutes;