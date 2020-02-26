import express from 'express';
import objectRoutes from './src/routes/objectRoutes';
import domainRoutes from './src/routes/domainRoutes';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import cron from 'node-cron';
import request from 'request';


const app = express();
const PORT = 63145;

var domains = []

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/GenZSim', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

objectRoutes(app);
domainRoutes(app);


// serving static files
app.use(express.static('images'));

app.get('/', (req, res) => 
    res.send(`Node and express server running on port ${PORT}`)
);

app.listen(PORT, () =>
    console.log(`Your server is running on port ${PORT}`)
);

const rootURL = '/redfish/v1/'

cron.schedule("*/10 * * * * *", function(){
    request("http://localhost:63145/domain", function (error, response, body) {
        var domainJSON = JSON.parse(body);
        domainJSON.forEach(elem => {
            domains = []
            domains.push(elem.Id);
        })
    })
    console.log(domains)
    //new port logic
    domains.forEach(domain => {
        // if not in collection of domains
        request({ url: 'http://localhost:63145/object/2', method: 'GET', json: {"domainID": domain}}, function (error, response, body) {
            if (body == null){
                request(domain+rootURL, function (error, response, body) {
                        console.log(JSON.parse(body));
                        var Id = domain+rootURL;
                        request({ url: 'http://localhost:63145/object', method: 'POST',  json: {"Id": Id, "domainID": domain, "@odata.id": Id, "jsonFile": body}});
                    })
            }
        })
    })

});