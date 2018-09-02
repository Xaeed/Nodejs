
const startupDebugger=require('debug')('app:startup');
const dbDebugger=require('debug')('app:db');
const config =require('config');
const logger =require('./logger');
const express = require('express');
const helmet = require('helmet');
const morgan=require('morgan');
const Courses= require('./routes/Courses');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

  const app = express();
app.use(express.json());
app.use('/api/courses/',Courses)
app.use(helmet());
//Environment setting
//const environment =process.env.NODE_EVN; // difference between two 
console.log(`Environment is : ${app.get('env')}`);
 
// here will check configuraiton settings according to environment

console.log('Name of server  :'+ config.get('name'));
console.log('Name of mail server         :'+config.get('mail.host'));
//console.log('Name of mail server         :'+config.get('mail.password'));
//console.log('Id of mail server         :'+config.get('mail.secureid'));



app.set('view engine','pug');
app.set('views','./views')

if (app.get('env')== 'development')
{
    app.use(morgan('tiny'));
    console.log('Development environment done ');
    startupDebugger('startup debugger is enabled');
}

dbDebugger('Database is connected');

app.use(logger);

  
port = process.env.port || 3000
app.listen(port,()=>{console.log('App is listeing at 3000adasd');});