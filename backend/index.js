//Import the exported app from server.js for connection to the internal set of routes & api.
import app from "./server.js";
//File for database connection and server starting
//const server = require('./server');
//import server from "./server.js"
//const { MongoClient } = require('mongodb')
import mongodb from "mongodb";
import dotenv from "dotenv";
import entriesDAO from './dao/entriesDAO.js'
import entriesMod from './dao/modDAO.js'

dotenv.config()
const MongoClient = mongodb.MongoClient;

const port = process.env.PORT || 5000;

//Connect to te Mongodb server.
MongoClient.connect(
    //Update the accessor to MONGODB_URI when connecting in non-dev sense. OR, update HAIA user to be write-only and keep a separate admin. For some reason, the bigman45 user keeps on having authentification failures.
    process.env.MONGODB_URI,
    {
        //Maximum of 100 people may connect to this database at any one time.
        maxPoolSize: 100,
        //You will time out of this database after 2500 ms
        wtimeoutMS: 2500,
        useNewUrlParser: true
    }
)

//If there were any errors, record them and then quit process.
.catch(err => {
    console.error(err.stack);
    process.exit(1);
})
//We have successfully connected to the database.
.then(async client => {
    //Right now we're going to await a connection to the entriesDAO database. Later, I want to design this so that we ONLY await an entriesDAO connection AFTER prompting the search, perhaps checking to establish a general connection before getting to index.html and displaying an error if there is none?
    await entriesMod.injectDB(client);
    await entriesDAO.injectDB(client);
    app.listen(port, () => {
        //Tell the console we have successfully connected to the port.
        console.log('listening on port' + ' ' + port);
    })
})

