//Mongodb import
import mongodb from "mongodb";
//Mongodb ObjectId object type import, incase we need it (would only be for dev purposes)
const ObjectId = mongodb.ObjectId;

//Database connection; will really be used by me for searching.
let entries;

//This class & its methods will handle the actual connections to the database.
export default class entriesDAO {
    //Connect to the database
    static async injectDB(conn){
        if (entries){
            return;
        }
    try{
        //dev code
        //connect to the "entries" collection within the "haia" database.
        //entries = await conn.db(process.env.ENTRIES_NS).collection("entries");
        entries = await conn.db(process.env.ENTRIES_NS).collection("categories");
    }
    catch (err) {
        console.error(
            'Unable to connect to the entries database: ' + err
        )
    }
    }
    //This method works for SEARCH functionality. Add arguments to this method to control search functionality. Modify this method to add further complexity to search relying on frontend feedback later.
    static async getResults({
        filters = null,
        page = 1,
        entriesPerPage = 50,
    } = {}){
        //Generate our actual query depending on if filters were provided. Add functionality for if no filters were provided to just have it be everything matching the input.
        //Three cases:
            //Case 1: Set of non-specific (given to field "text" filtes given, indicating a general search)
            //Case 2: Set of specific (not given to field "text" filters given, indicating an advanced search.)
            //Case 3: No filters given at all; we are retrieving the entire database.
        let query = {

        };
        //If our filter is "text", this means we are executing a general search and are looking for a word match in any field.
        if(filters.text){
            query={
                $or:[{title:text}, {src:text}, {keywords:text}]
            }
        } // modify this full query: $or:[{title:text}, {subtitle:text}, {src:text}, {description:text}, {context:text}, {keywords:text}, {tags:text}, {authors:text}]
        //If our filter type is not "text", this means we are executing an advanced search with specific field checks
        else if (filters){
            if ("title" in filters){
                /*mongodb search call with te filter given in the title field of "filters". "Text" query means it will search for ANY textual match within the specific INDEXES for the fields, which must be created SEPARATELY. I've removed the text search. Regex is similar.
                            So, for example, if the "title" of a database entry O is "Abyssinian ladies in waiting", and the search query is by title "ladies", then entry O will be given*/
                //"options: i ensures case-insensitivity, which is by default turned off for regex searches (searches are by default case-sensitive."
                query.title = {"$regex": filters["title"], "$options":"i"};
            }
            if ("subtitle" in filters){
                /*mongodb search call with te filter given in the title field of "filters". "Text" query means it will search for ANY textual match within the specific INDEXES for the fields, which must be created SEPARATELY. I've removed the text search. Regex is similar.
                            So, for example, if the "title" of a database entry O is "Abyssinian ladies in waiting", and the search query is by title "ladies", then entry O will be given*/
                query.subtitle = filters.subtitle;
            }
            if ("src" in filters){
                //mongodb search call with te filter given in the src field of "filters". Uses a regex search so that match can be imperfect.
                query.src = {"$regex": filters.src, "$options":"i"};
            }
            if ("description" in filters){
                query.description = {"$regex": filters.description, "$options":"i"};
            }
            if ("context" in filters){
                query.context = {"$regex": filters.context, "$options":"i"};
            }/*
            if("tags" in filters){
                query.tags = {"regex": filters.tags}; //use "all" or "in" operators for arrays.
            }
            if("keywords" in filters){
                query.keywords = {"regex": filters.keywords};
            }
            if("authors" in filters){
                query.authors = {""}
            } currently unimplemented*/
            if("hid" in filters){
                query.hid = {"$regex":filters.hid};
            }
            /* Another text-in result match
            if ("context" in filters){
                //mongodb search call with te filter given in the title field of "filters"
                query = { "$text": { $search: filters["context"]}}
            }*/
        }
        

        let cursor

        try{
            cursor = await entries
                .find(query) //Later add filtering out of _id from return.
        } 
        catch(error) {
            console.error('Unable to issue find command ' + '\n' + error)
            return {
                entriesList: [], totalNumEntries: 0
            }
        }
        //Limit amount of results per page to the entries per page input, and set each page to show the results following the previous page's (starting at showing the results from 0-limit for page 1)
        if(entriesPerPage != 50){
            const displayCursor = cursor.limit(entriesPerPage).skip(entriesPerPage * (page - 1))
        }

        try{
            const resultsList = await displayCursor.toArray();
            //Set the total number of results to be whatever number of entries we got from the
            const totalNumResults = await entries.countDocuments(query);

            return [ resultsList, totalNumResults, entriesPerPage ]
        }
        catch(error) {
            console.error(
                'Unable to convert result into array or difficulty counting results ' + '\n' + error
            )
        }
    }






    
}