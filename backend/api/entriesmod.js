//Controller class analogous to entriescontroller, for requests to modify the mongodb database.

//imports
//import the directAccessObject from the entrymodDAO class located in the directAccessObject folder.
import entriesmodDAO from '../dao/modDAO.js'
//Import the class type "ObjectId" from mongodb.
import { ObjectId } from 'mongodb'

export default class entriesMod{
    //Method to post things to the database. MAKE SURE TO ADD ALL FIELDS WHEN MODIFYING FOR THE FINAL SETUP!
    static async apiPostEntry(req, res, next){
        try{
            //Variable definitions, taken from the request
            const title = req.body.title
            const src = req.body.src
            const keywords = req.body.keywords
            const url = req.body.url
            
            //Call the post method in the entriesmodDAO page and add a post with the info as defined in the request.
            //ADD ALL FIELDS WHEN MODIFYING FOR THE FINAL SETUP!
            const verifyPosted = await entriesmodDAO.addEntry(
                title,
                src,
                keywords,
                url
            )
            //If the post was successful, return a json file with "success".
            res.json({status: "success"})
        }
        //If there was a failure in posting, return a response with the status '500' and a json file with an error field.
        catch(error){
            res.status(500).json({ error: error.message} )
        }
    }

    //Method to modify things in te database.
    static async apiUpdateEntry(req, res, next){
        try{
            /*//THE DELETE PROCESS IS REQUESTING A NUMBER TO BE CONVERTED INTO A MONGODB OBJECTID!!!
            const id = ObjectId(req.body._id)*/
            //const hid = req.body.hid
            const title = req.body.title
            const src = req.body.src
            const keywords = req.body.keywords
            const url = req.body.url
            //Individual keyword to replace.
            const keyword = req.body.keyword
            const keywordInd = req.body.keywordInd
            //Throw error if hid not provided? Message: hid required, need to know what to update!
            //Throw error if single keyword is provided and keywords are provided
            //Throw error if single keyword is given without a keywordInd
            //Process te update request by determining whether or not we are dealing with keywords or a keyword at an index
            //Contact the DAO server with the given contents and therefore update the given post.
            const verifyUpdated = await entriesmodDAO.updateEntry(
                //hid
                title,
                src,
                keywords,
                url
            )

            var { error } = verifyUpdated;
            if (error){
                res.status(400).json({ error })
            }
            if (verifyUpdated.modifiedCount === 0){
                throw new Error("nothing updated")
            }
            else{
                res.json({ status: "success"})
            }
        }
        catch(error){
            res.status(500).json({ error: error.message });
        }
    }

    //Method to delete tings from the database.
    static async apiDeleteEntry(req, res, next){
        try{
            //THE DELETE PROCESS IS REQUESTING A NUMBER TO BE CONVERTED INTO A MONGODB OBJECTID!!!
            const id = new ObjectId(req.body._id)
            const hid = req.body.hid

            if(!id){} //throw error if no id is given?
            if(!hid){} //or if no hid is given?

            const verifyDeleted = await entriesmodDAO.deleteEntry(
                id,
                hid,
            )
            res.json({ status: "success" });
        }
        catch(error){
            res.status(500).json({ eror: error.message });
        }
    }
    /* 
        Dev method meant to retrieve an entry by its mongodb id as opposed to its hid
    static async apiEntryByID(req, res, next){

    }*/
}