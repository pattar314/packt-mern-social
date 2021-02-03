import express from 'express';
import path from 'path';
import devBundle from './devBundle';
import template from './../template';
import { MongoClient } from 'mongodb';
import app from './../server/express';


const CURRENT_WORKING_DIR = process.cwd();

app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')));

app.get('/', (req, res) => {
    res.status(200).send(template())
})


// mongoose.connect(config.mongoUri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })


const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/mernSimpleSetup';
MongoClient.connect(url, (err, db) => {
    console.log("Connected successfully to mongodb server");
    db.close();
    if (err) {
        console.log('there was an error: ', err);
    }
})



devBundle.compile(app);


let port = process.env.PORT || 3000;

app.listen(port, function onStart(err){
    if(err) {
        console.log(err);
    }
    console.info('Server started on port %s', port);
})