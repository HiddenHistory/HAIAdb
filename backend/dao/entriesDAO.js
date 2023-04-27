//Mongodb import
import mongodb from "mongodb";
//Mongodb ObjectId object type import, incase we need it (would only be for dev purposes)
const ObjectId = mongodb.ObjectId;

//Database connection; will really be used by me for searching.
let entries;

//This class & its methods will handle the actual connections to the database.
export default class entriesDAO {
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
        entriesPerPage = 25,
    } = {}){
        let query;
        //Generate our actual query depending on if filters were provided. Add functionality for if no filters were provided to just have it be everything matching the input.
        if (filters){
            if ("title" in filters){
                /*mongodb search call with te filter given in the title field of "filters". "Text" query means it will search for ANY textual match within the given database set's fields
                            So, for example, if the "title" of a database entry O is "Abyssinian ladies in waiting", and the search query is by title "ladies", then entry O will be given*/
                query = { $text: { $search: filters["title"]}}
            }
            if ("src" in filters){
                //mongodb search call with te filter given in the src field of "filters"
                query = { $text: { $search: filters["src"]}}
            }/* Another text-in result match
            if ("context" in filters){
                //mongodb search call with te filter given in the title field of "filters"
                query = { "$text": { $search: filters["context"]}}
            }
                The hid search is by exact match for a given hid. These should be unique per entry.
            if ("hid" in filters){
                //mongodb search call with te filter given in the title field of "filters"
                query = { "hid": { $eq: filters["hid"]}}
            }*/
        }

        let cursor

        try{
            cursor = await entries
                .find(query)
        } 
        catch(error) {
            console.error('Unable to issue find command ' + '\n' + error)
            return {
                entriesList: [], totalNumEntries: 0
            }
        }
        //Limit amount of results per page to the entries per page input, and set each page to show the results following the previous page's (starting at showing the results from 0-limit for page 1)
        const displayCursor = cursor.limit(entriesPerPage).skip(entriesPerPage * (page - 1))

        try{
            const resultsList = await displayCursor.toArray();
            //Set the total number of results to be whatever number of entries we got from the
            const totalNumResults = await entries.countDocuments(query);

            return [ resultsList, totalNumResults ]
        }
        catch(error) {
            console.error(
                'Unable to convert result into array or difficulty counting results ' + '\n' + error
            )
        }
    }
}