//imporant imports
//const express = require('express');
//const cors = require('cors');
import express from 'express';
import cors from 'cors';
import entries from './api/entriesroute.js'

const app = express();

app.use(cors());
app.use(express.json());

//The server will use the routes provided from from the file "entries" with the url "api/v1/entries/..."
app.use("/api/v1/entries", entries);
//Attempt to access non-existent routes.
app.use("*", (req, res) => res.status(404).json({error: "page not found"}));

//Export the app. This will be accessed by the database.
export default app;