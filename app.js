const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routers');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


route(app);


module.exports = app.listen(3000, ()=>{console.log(`Server run on port ${3000}`)})
