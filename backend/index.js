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
        if (body != null){
            let domainJSON = JSON.parse(body);
            domainJSON.forEach(elem => {
                domains = []
                domains.push(elem.Id);
            })
        }
    })
    console.log(domains)

    domains.forEach(domain => {
        // if not in collection of domains
        request({ url: 'http://localhost:63145/object/2', method: 'GET', json: {"domainID": domain}}, function (error, response, body) {
            if (body == null){
                request(domain+rootURL, function (error, response, body) {
                       // console.log(JSON.parse(body));
                        let Id = domain+rootURL;
                        console.log("adding domain and link: " + domain);
                        request({ url: 'http://localhost:63145/object', method: 'POST',  json: {"Id": Id, "domainID": domain, "@odata.id": Id, "jsonFile": body, "updated_date": Date.now()}});
                        request({ url: 'http://localhost:63145/link', method: 'POST',  json: {"link": Id, "domain": domain, "updated_date": Date.now()}});
                    })
            }
        })
    })

});

//new odata.id
cron.schedule("*/10 * * * * *", function(){
    request({ url: 'http://localhost:63145/object', method: 'GET'}, function (error, response, body) {
        if (body != null){
            body = JSON.parse(body)
            body.forEach(obj => {
                let jsonFile = JSON.parse(obj.jsonFile);
                for(let k in jsonFile)
                    //checks up to 2 levels of nesting for @odata.id
                    if(typeof jsonFile[k] == "object"){
                        for (let k2 in jsonFile[k]){
                            if (k2 == "@odata.id"){
                                let link = obj.domainID + jsonFile[k][k2];
                               // console.log(link)
                                request({ url: 'http://localhost:63145/link/1', method: 'GET', json: {"link": link}}, function (error, response, body) {
                                    if (body == null){
                                        console.log("adding link: " + link);
                                        request({ url: 'http://localhost:63145/link', method: 'POST',  json: {"link": link, "domain": obj.domainID, "updated_date": Date.now()}});
                                    }
                                })
                            }
                            else if (typeof jsonFile[k][k2] == "object"){ 
                                //add a loop for elements in k2 to account for array
                                for(let k3 in jsonFile[k][k2]){
                                    if (k3 == "@odata.id"){
                                        let link = obj.domainID + jsonFile[k][k2][k3];
                                        request({ url: 'http://localhost:63145/link/1', method: 'GET', json: {"link": link}}, function (error, response, body) {
                                            if (body == null){
                                                console.log("adding link: " + link);
                                                request({ url: 'http://localhost:63145/link', method: 'POST',  json: {"link": link, "domain": obj.domainID, "updated_date": Date.now()}});
                                            }
                                            
                                        })
                                    }
                                    else if (typeof jsonFile[k][k2][k3] == "object"){
                                        if (jsonFile[k][k2][k3]["@odata.id"] != undefined){
                                            let link = obj.domainID + jsonFile[k][k2][k3]["@odata.id"];
                                        request({ url: 'http://localhost:63145/link/1', method: 'GET', json: {"link": link}}, function (error, response, body) {
                                            if (body == null){
                                                console.log("adding link: " + link);
                                                request({ url: 'http://localhost:63145/link', method: 'POST',  json: {"link": link, "domain": obj.domainID, "updated_date": Date.now()}});
                                            }
                                            
                                        })
                                        }
                                    }
                                }
                            }
                        }
                    }
                })
            }
        })
    })
// loop through links to update objects
cron.schedule("*/10 * * * * *", function(){
    request({ url: 'http://localhost:63145/link', method: 'GET'}, function (error, response, body) {
        if (body != null){
            body = JSON.parse(body);
            body.forEach(link => {
                request({ url: link.link, method: 'GET'}, function (error, response, body) {
                    let simBody = body;
                    request({ url: 'http://localhost:63145/object/1', method: 'GET', json: {"objectID": link.link}}, function (error, response, body) {
                        //add new object
                        if (body == null){
                            console.log("adding: " + link.link);
                            request({ url: 'http://localhost:63145/object', method: 'POST',  json: {"Id": link.link, "domainID": link.domain, "@odata.id": link.link, "jsonFile": simBody, "updated_date": Date.now()}});
                        }
                        //update object
                        else if (simBody != undefined){
                            console.log("updating: " + link.link);
                            request({ url: 'http://localhost:63145/object/1', method: 'PUT',  json: {"objectID": link.link, "jsonFile": simBody, "updated_date": Date.now()}});
                        }
                        else{
                            console.log("error connecting to: " + link.link);
                        }
                    })
                })
                
            })
        }
        })
    })