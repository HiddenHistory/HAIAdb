//imports.
//const express = require('express');
import express from 'express'
import entriesController from './entriescontroller.js'
import entriesMod from './entriesmod.js'
//Connect to the router class within the express app doc
const router = express.Router();

//Basic route for get requests. If we want to add an additional route for search requests vs other specific get requests, add a route ere
router.route("/").get(entriesController.apiGetResults);

//Router thingy containing the code / routes for MODIFICATION requests to te database.
router.route('/modify')
    //add new entries to the database
    .post(entriesMod.apiPostEntry)
    //update an entry in the database. CHANGE TO A PATCH OPERATION LATER. ALSO UPDATE OPERATION IN ENTRIESMOD
    .put(entriesMod.apiUpdateEntry)
    //Delete request
    .delete(entriesMod.apiDeleteEntry)

//Any class that imports this class (say, for example, the frontend classes, will recieve this router.)
export default router;