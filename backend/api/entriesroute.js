//imports.
//const express = require('express');
import express from 'express'
import entriesController from './entriescontroller.js'
//Connect to the router class within the express app doc
const router = express.Router();

router.route("/").get(entriesController.apiGetResults)

export default router;