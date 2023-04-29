//Helper-file to use axios connection to the backend database, using axios middleman.
import axios from "axios";

export default axios.create({
    //URL to the general database url to connect to it and parse / modify its contents. URL can be changed to access the modification section. You need to do this because axios will not be allowed to access the database directly through the frontend website, which isn't a url allowed to access the database. Doing this basically lets axios route its request through a url that's allowed to give it.
    baseURL: "http://localhost:5000/api/v1/entries",

    headers: {
        "Content-Tye": "application/json"
    }
});