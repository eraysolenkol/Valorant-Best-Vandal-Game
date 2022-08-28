const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');


const pageRoute = require('./routes/pages');
const databaseRoute = require('./routes/api');


// Load the env file into process.env
dotenv.config();


const app = express();

var PORT = process.env.PORT;


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/public'));


app.set('view engine','ejs');


app.use('/', pageRoute);
app.use('/v1/api/', databaseRoute);


app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
})