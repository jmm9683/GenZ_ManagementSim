import { addNewDomain, 
    getDomains, 
    getDomainWithID, 
    updateDomain,
    deleteDomain
} from '../controllers/domainController'

const domainRoutes = (app) => {
app.route('/domain')
    .get((req, res, next) => {
        // middleware
       // console.log(`Request from: ${req.originalUrl}`);
       // console.log(`Request type: ${req.method}`);
        next();
    }, getDomains)
    
    // Post endpoint
    .post(addNewDomain);

app.route('/domain/1')
    // get a specific contact
    .get(getDomainWithID)
    
    // updataing specific contact
    .put(updateDomain)

    // deleting a specific contact
    .delete(deleteDomain);
}

export default domainRoutes;