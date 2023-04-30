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
            const hid = req.body.hid
            
            //Call the post method in the entriesmodDAO page and add a post with the info as defined in the request.
            //ADD ALL FIELDS WHEN MODIFYING FOR THE FINAL SETUP!
            const verifyPosted = await entriesmodDAO.addEntry(
                title,
                src,
                keywords,
                url,
                hid
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
            const hid = req.body.hid
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
                title,
                src,
                keywords,
                url,
                hid
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
            let id;
            //If our deletion request is properly functional, and we have a request body with an ID (SEE MY NOTES IN DATABASE.JS FOR WHY THIS MAY NOT BE!), use it for the ID property.
            if(req.body._id){
                id = new ObjectId(req.body._id)
            }
            else if(req.body.id){
                id = new ObjectId(req.body.id)
            }
            else if(req.query["$del"]){
                id = new ObjectId(req.query["$del"])
            }
            else if(req.url && req.url !== null){
                let idstr = '';
                for(let i = req.url -1; req.url.charAt(i) !== "="; i = i-1){
                    idstr = req.url.charAt(i) + idstr
                }
                id = new ObjectId(idstr)
            }
            else if(req.originalUrl && req.originalUrl !== null){
                let idstr = '';
                for(let i = req.originalUrl -1; req.originalUrl.charAt(i) !== "="; i = i-1){
                    idstr = req.originalUrl.charAt(i) + idstr
                }
                id = new ObjectId(idstr)
            }
            else if(req._parsedUrl.search && req._parsedUrl.search !== null){
                let idstr = '';
                for(let i = req._parsedUrl.search.length -1; req._parsedUrl.search.charAt(i) !== "="; i = i-1){
                    idstr = req._parsedUrl.search.charAt(i) + idstr
                }
                id = new ObjectId(idstr)
            }
            else if(req._parsedUrl.query && req._parsedUrl.query !== null){
                let idstr = '';
                for(let i = req._parsedUrl.query.length -1; req._parsedUrl.query.charAt(i) !== "="; i = i - 1){
                    idstr = req._parsedUrl.query.charAt(i) + idstr
                }
                id = new ObjectId(idstr)
            }
            else if(req._parsedUrl.path && req._parsedUrl.path !== null){
                let idstr = '';
                for(let i = req._parsedUrl.path.length -1; req._parsedUrl.path.charAt(i) !== "="; i = i-1){
                    idstr = req._parsedUrl.path.charAt(i) + idstr
                }
                id = new ObjectId(idstr)
            }
            else if(req._parsedUrl.href && req._parsedUrl.href !== null){
                let idstr = '';
                for(let i = req._parsedUrl.href.length -1; req._parsedUrl.href.charAt(i) !== "="; i = i-1){
                    idstr = req._parsedUrl.href.charAt(i) + idstr
                }
                id = new ObjectId(idstr)
            }
            else if(req._parsedUrl._raw && req._parsedUrl._raw !== null){
                let idstr = '';
                for(let i = req._parsedUrl._raw.length -1; req._parsedUrl._raw.charAt(i) !== "="; i = i - 1){
                    idstr = req._parsedUrl._raw.charAt(i) + idstr
                }
                id = new ObjectId(idstr)
            }

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