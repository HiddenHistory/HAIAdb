//Imports
import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//Import database class which allows for communications with database.
import EntryDataService from '../service/database';

//import searchResults?
import SearchResults from "../pages/searchResults"


//The point of this class is to send off to the search results page with only the text string given. The search results page should know that since no other specificaitons were given, it is to generally search the database by a default value or process.

const SearchBar = () => {

    //When the value is changed, we chang te text value. When te button is hit, we send out hte  value into a search redirect.
    const [text, setText] = useState("");
    
    return(
        <div>
        <input  type="text"
                className="searchbar"
                placeholder="Look for things!"
                value={text}
                onChange={e => setText(e.target.value)}
        />
                
        <Link   to={
                    "/search:find/"
                }
                //Sends over a props file to the searchResults page, indicating what text we are looking for, how many entries per page, which page we will be viewing, and whether we need to actually connect to the database to find it.
                state={
                    {
                        text:text,
                        entriesPerPage:"25",
                        page:1,
                        mode:true
                    }
                 }>
            <button className="searchButton"
                type="button"
            >
                Search
            </button>
        </Link>
        </div>
    )
}

export default SearchBar

//When we hit the searchbar or the ADVANCEDSEARCH, we want to REDIRECT to the SEARCHRESULT page layout with a QUERY having been given (with or without filters) to the GET or FIND methods defined in DATABASE.JS.