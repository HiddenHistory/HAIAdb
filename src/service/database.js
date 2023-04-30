//Javascript file to control interactions with the backend database.
//Imports
//add the connection to the database so that the rest of the webapp can access specific entry specifications.
import http from "../http-common";

class EntryDataService {
    //Retrieve ALL entries; for the purposes of modification (entryMod). Adds a page parameter
    static getAllPaginated(page = 1){
        return http.get(`?page=${page}`);
    }
    //Retrieve ALL entries; for the purposes of modification (entryMod). Adds a page parameter
    static getAll(){
        return http.get();
    }
    //For returning the contents of a specific entry by id, for the entry display. Will ideally use hID later.
    static get(query, by){
        return http.get(`?${by}=${query}&match=exact`);
    }
    //Initiate a particular search and retrieve results which fit, paginated. Default look for title.
    static findPaginated(query, by, page, entriesPerPage){
        //If "!by" (if by is null), implement a generalized search.
        //Else, take the ARRAY of parameters given to "by" and execute a search using ANY of them to generate a hit.
        return http.get(`?${by}=${query}&page=${page}`);
    }
    //Initiate a particular search and retrieve results which fit, paginated. Default look for title.
    static find(query, by){
        //If "!by" (if by is null), implement a generalized search.
        //Else, take the ARRAY of parameters given to "by" and execute a search using ANY of them to generate a hit.
        return http.get(`?${by}=${query}`);
    }
    //Mod-exclusive functions.
    static createEntry(data){
        //On front-end, there should be a flag that freaks out if title, source, . HID is to be generated in back-end controller process.
        return http.post("/modify", data);
    }
    static updateEntry(data){
        //On front-end, there should be a flag that freaks out if title (later set to _id) isn't given!)
        return http.patch('/modify', data);
    }
    static deleteEntry(data){
        /*NOTE THIS: FOR SOME REASON, AXIOS SEEMS INCAPABLE OF PASSING IN A REQ BODY WHEN RUNNING A DELETE REQUEST. LITERALLY JUST GIVES AN EMPTY BODY. WAS DRIVING ME MAD! PLEASE REMEMBER THAT, BECAUSE OF THIS, WE HAVE TO RELY ON "ILLEGAL ACTIVITY" (SMUGGLING) TO PUSH THROUGH OUR DELETION ACTIVITY TO THE BACKEND ---- EITHER: FAKEOUT AXIOS BY SENDING A RANDOM REQUEST TO PASS THE ID THROUGH ONLY TO THEN CALL AN ACTUAL DELETION METHOD IN BACKEND, OR FORCE THROUGH THE REQUEST BY PASSING IT INTO THE REQUEST URL ****AS A STRING**** SO THE BACKEND IS ABLE TO RETRIEVE IT. RIDICULOUS.*/
        //On front-end, there should be a freak-out flag if the ID given is invalid! (wrong char count) to prevent even an attempt an an improper deletion request.
        return http.delete(`/modify?$del=${data}`);
    }
}

export default EntryDataService;