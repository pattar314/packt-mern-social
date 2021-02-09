import express from 'express';
import path from 'path';
import template from './../template';
import app from './express';
import config from './../config/config';
import mongoose from 'mongoose';


const CURRENT_WORKING_DIR = process.cwd();

app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')));

app.get('/', (req, res) => {
    res.status(200).send(template())
})

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/mernSimpleSetup';

mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri, { useNewUrlParser: true,
                                    useCreateIndex: true, 
                                    useUnifiedTopology: true })


mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database: ${mongoUri}`)
})

mongoose.connection.on('connect', () => {
    console.log('we are connected')
})

app.listen(config.port, (err) => {
    if(err) {
        console.log(err);
    }
    console.info('Server started on port %s', config.port);
})