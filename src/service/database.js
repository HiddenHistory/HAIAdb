//Javascript file to control interactions with the backend database.
//Imports
//add the connection to the database so that the rest of the webapp can access specific entry specifications.
import http from "../http-common";

class EntryDataService {
    //Retrieve ALL entries; for the purposes of modification (entryMod). Adds a page parameter
    static getAll(page = 1){
        return http.get(`?page=${page}`);
    }
    //For returning the contents of a specific entry by id, for the entry display. Will ideally use hID later.
    static get(id){
        return http.get(`/id/${id}`);
    }
    //Initiate a particular search and retrieve results which fit that title
    static find(query, by="title", page=1){
        //If "!by" (if by is null), implement a generalized search.
        //Else, take the ARRAY of parameters given to "by" and execute a search using ANY of them to generate a hit.
        return http.get(`?${by}=${query}&page=${page}`);
    }
    static createEntry(data){
        //On front-end, there should be a flag that freaks out if title, source, . HID is to be generated in back-end controller process.
        return http.post("/modify", data);
    }
    static updateEntry(data){
        //On front-end, there should be a flag that freaks out if title (later set to _id) isn't given!)
        return http.patch('/modify', data);
    }
    static deleteEntry(data){
        //On front-end, there should be a freak-out flag if the ID given is invalid! (wrong char count) to prevent even an attempt an an improper deletion request.
        return http.delete(`/modify?id=${data}`);
    }
}

export default EntryDataService;