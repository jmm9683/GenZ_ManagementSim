import { addNewObject, 
    getObjects, 
    getObjectWithID, 
    updateObject,
    deleteObject,
    getObjectWithDomainID
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

app.route('/object/2')
    //see if domainID exists
    .get(getObjectWithDomainID);

}

export default objectRoutes;