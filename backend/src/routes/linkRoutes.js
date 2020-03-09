import { addNewLink,
    getLinks,
    getLinkWithID,
    updateLink,
    deleteLink,
    getAllLinkWithID

} from '../controllers/linkController'

const linkRoutes = (app) => {
app.route('/link')
    .get((req, res, next) => {
        // middleware
       // console.log(`Request from: ${req.originalUrl}`);
       // console.log(`Request type: ${req.method}`);
        next();
    }, getLinks)
    
    // Post endpoint
    .post(addNewLink);

app.route('/link/1')
    // get a specific contact
    .get(getLinkWithID)
    
    // updataing specific contact
    .put(updateLink)

    // deleting a specific contact
    .delete(deleteLink);

app.route('/link/2')
    .get(getAllLinkWithID);

}

export default linkRoutes;