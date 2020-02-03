import express from 'express';
import sysColRoutes from './src/routes/sysColRoutes';
import sysRoutes from './src/routes/sysRoutes';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';


const app = express();
const PORT = 63145;

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

// serving static files
app.use(express.static('images'));

app.get('/', (req, res) => 
    res.send(`Node and express server running on port ${PORT}`)
);

app.listen(PORT, () =>
    console.log(`Your server is running on port ${PORT}`)
);