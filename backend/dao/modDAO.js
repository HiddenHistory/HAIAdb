//Mongodb import
import mongodb from "mongodb";
//Mongodb ObjectId object type import, incase we need it (would only be for dev purposes)
const ObjectId = mongodb.ObjectId;

//Database connection; will really be used by me for searching.
let modDao;

//This class & its methods will handle the actual connections to the database.
export default class entriesmodDAO {
    //Connect to the database
    static async injectDB(conn){
        if (modDao){
            return;
        }
    try{
        //dev code
        //connect to the "entries" collection within the "haia" database.
        //entries = await conn.db(process.env.ENTRIES_NS).collection("entries");
        modDao = await conn.db(process.env.ENTRIES_NS).collection("categories");
    }
    catch (err) {
        console.error(
            'Unable to connect to the entries database: ' + err
        )
    }
    }

    //Adds an entry. ADD the other input fields
    static async addEntry(title, src, keywords, url){
        try{
            const entryDoc = { //The tutorial uses a user class that will contain its own id. I will not.
                title: title,
                src: src,
                keywords: keywords,
                url: url
            }
            //Insert into the database
            return await modDao.insertOne(entryDoc);
        }
        catch(error){
            console.error('Insertion into the database failed: \n' + error);
        }        
    }

    //Update entry, currntly identified by title, will later be identified by id and/or hid
    static async updateEntry(title, src, keywords, url){
        try{
            //Could I do field selections for declarations using actual variables instead of 'src', 'keywords', 'url'? If so, I could write a loop to determine how many of the potential inputs are NULL and how many exist, write the ones that exist into an ARRAY, and then pass those into the SET command along with the given value
            const updateEntry = await modDao.updateOne(
                {title:title},
                {$set: {title:title, src: src, keywords:keywords, url: url}}
            )
            return updateEntry;
        }
        catch(error){
            console.error('Update error: \n' + error)
        }
    }
    //Later, replace using title with using ID
    static async deleteEntry(id, hid){
        try{
            const deleteEntry = await modDao.deleteOne(
                {_id:id}
            )
        }
        catch(error){
            console.error('Deletion error: \n' + error)
        }
    }
}