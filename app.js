const express = require('express');
const route = require('./routers');

const app = express();


route(app);


module.exports = app.listen(3000, ()=>{console.log(`Server run on port ${3000}`)})
