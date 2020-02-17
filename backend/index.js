import express from 'express';
import sysColRoutes from './src/routes/sysColRoutes';
import sysRoutes from './src/routes/sysRoutes';
import simTestRoutes from './src/routes/simulatorTesting';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import cron from 'node-cron';
import request from 'request';


const app = express();
const PORT = 63145;

cron.schedule("*/10 * * * * *", function(){

    request('http://localhost:63145/simtest', function (error, response, body) {
        var Id = JSON.parse(body)[0].Id
        console.log(JSON.parse(body)[0].updated_date)
        console.log(JSON.parse(body)[0])
        request({ url: 'http://localhost:63145/system/' + Id, method: 'PUT',  json: body})
        console.log(Id)
    })

});

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

sysColRoutes(app);
sysRoutes(app);
simTestRoutes(app);


// serving static files
app.use(express.static('images'));

app.get('/', (req, res) => 
    res.send(`Node and express server running on port ${PORT}`)
);

app.listen(PORT, () =>
    console.log(`Your server is running on port ${PORT}`)
);