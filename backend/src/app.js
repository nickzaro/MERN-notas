const express = require('express');
const cors = require('cors');
const app = express();

//settings
app.set('port', process.env.PORT || 4000);


//middlewares
app.use(cors());
app.use(express.json());

//routes
app.get('/',(req,res)=>res.send('Inicial'));
app.use('/api/users',require('./routes/users'));
app.use('/api/notes',require('./routes/notes'));


module.exports = app;