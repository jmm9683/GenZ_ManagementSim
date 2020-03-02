import express from 'express';
import objectRoutes from './src/routes/objectRoutes';
import domainRoutes from './src/routes/domainRoutes';
import linkRoutes from './src/routes/linkRoutes';
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
linkRoutes(app);



// serving static files
app.use(express.static('images'));

app.get('/', (req, res) => 
    res.send(`Node and express server running on port ${PORT}`)
);

app.listen(PORT, () =>
    console.log(`Your server is running on port ${PORT}`)
);

const rootURL = '/redfish/v1/'

// new port logic
cron.schedule("*/10 * * * * *", function(){
    request("http://localhost:63145/domain", function (error, response, body) {
        var domainJSON = JSON.parse(body);
        domainJSON.forEach(elem => {
            domains = []
            domains.push(elem.Id);
        })
    })
    console.log(domains)

    domains.forEach(domain => {
        // if not in collection of domains
        request({ url: 'http://localhost:63145/object/2', method: 'GET', json: {"domainID": domain}}, function (error, response, body) {
            if (body == null){
                request(domain+rootURL, function (error, response, body) {
                       // console.log(JSON.parse(body));
                        var Id = domain+rootURL;
                        request({ url: 'http://localhost:63145/object', method: 'POST',  json: {"Id": Id, "domainID": domain, "@odata.id": Id, "jsonFile": body, "updated_date": Date.now}});
                        request({ url: 'http://localhost:63145/link', method: 'POST',  json: {"link": Id, "updated_date": Date.now}});
                    })
            }
        })
    })

});

//new odata.id
cron.schedule("*/10 * * * * *", function(){
    request({ url: 'http://localhost:63145/object', method: 'GET'}, function (error, response, body) {
            body = JSON.parse(body)
            body.forEach(obj => {
                var jsonFile = JSON.parse(obj.jsonFile);
                for(var k in jsonFile)
                    //checks up to 2 levels of nesting for @odata.id
                    if(typeof jsonFile[k] == "object"){
                        for (var k2 in jsonFile[k]){
                            if (k2 == "@odata.id"){
                                var link = obj.domainID + jsonFile[k][k2];
                                request({ url: 'http://localhost:63145/link/1', method: 'GET', json: {"link": link}}, function (error, response, body) {
                                    if (body == null){
                                        console.log(link)
                                        // request({ url: 'http://localhost:63145/link', method: 'POST',  json: {"link": link, "updated_date": Date.now}});

                                    }
                                })
                            }
                            else if (typeof jsonFile[k][k2] == "object"){
                                if (jsonFile[k][k2]['@odata.id'] != undefined){
                                    var link = obj.domainID + jsonFile[k][k2]['@odata.id'];
                                    request({ url: 'http://localhost:63145/link/1', method: 'GET', json: {"link": link}}, function (error, response, body) {
                                        if (body == null){
                                            //   request({ url: 'http://localhost:63145/link', method: 'POST',  json: {"link": link, "updated_date": Date.now}});
                                        }
                                         
                                    })
                                }
                            }
                        }
                    }
            })
            

        })
    })