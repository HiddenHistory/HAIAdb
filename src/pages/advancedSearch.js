//Imports
import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//Import database class which allows for communications with database.
import EntryDataService from '../service/database';

//import searchResults?
import SearchResults from "./searchResults";


//Purpose of this page is to take a set of search parameters, and to pass it on to the searchResults page, which will display the resulting search.

const AdvancedSearch = () => {
    
    const [searchTitle, setSearchTitle] = useState("");
    const [searchSource, setSearchSource] = useState("");
    const [searchKeywords, setSearchKeywords] = useState("");
    const [searchEntriesPerPage, setSearchEntriesPerPage] = useState("10");

    
  /*Notes on REACT function organization*/
    //Before reaching the return bloc in any app return section, we may declare any number of variables and work wiht them. REMEMBER THAT!
    //We may accordingly access those variables wiht the syntax { varname } as if it were either html section code or page text (inwhich case, the contents of the value are converted ot a string before input).
    //We can also put in CODE within the curly braces, whose contents or return value will be given in the browser or returned as a Stirng.


    //When the search button is hit, we are going to retrieve the values from each of the input box fields, and we are going to pass them into the prop for the searchResults page, which will contain the actual results of the searc aswell as a pagination system.
    return (
      <div className="content">
        Hi
        {
            /*Separate searchbars to record different search information. Comprised of:
                type: records that the search values are recording Strings
                className: you already know
                value: gives what will be shown by the searchbar, and what is going to be updated within it
                onChange: wenever the searchbar parameter is modified, the value will also be modified.

            */ 
        }
        <div id="searchbars">
            <input  type="text"
                    className="searchBar"
                    placeholder="Title text for search"
                    value={searchTitle}
                    onChange={e=>setSearchTitle(e.target.value)}
            />
            <input  type="text"
                    className="searchBar"
                    placeholder="Source text for search"
                    value={searchSource}
                    onChange={e=>setSearchSource(e.target.value)}
            />
            <input  type="text"
                    className="searchBar"
                    placeholder="Keywords for search (separate by comma)"
                    value={searchKeywords}
                    onChange={e=>setSearchKeywords(e.target.value)}
            />
            <select  
                    className="dropdown"
                    onChange={e=>setSearchEntriesPerPage(e.target.value)}
                    value={searchEntriesPerPage}>
                    <option value="10" type="number">10</option>
                    <option value="15" type="number">15</option>
                    <option value="20" type="number">20</option>
                    <option value="25" type="number">25</option>
            </select>
            
            {
                //This button, contained in the searchbars div, is wrapped by a link which, when pressed, will REIDRECT to the searchResults.js page, where the search happens using the given queries to influence results.
                //ADD ADDITIONAL PARAMETERS ON FINAL IMPLEMENTATION!
            }
            <Link   to={
                        "/search/AdvBar"
                    } 
                    state={
                        {
                            title:searchTitle,
                            src:searchSource,
                            keywords:searchKeywords,
                            entriesPerPage:searchEntriesPerPage,
                            page:1,
                            mode:true
                        }
                    }
            > {
                //When the search is initiated, we want to first convert our keyword & other values that should be of type ARRAY into ARRAYs
            }
                <button className="searchButton"
                    type="button"
                >
                    Search 
                </button>
            </Link>
            
        </div>
        
      </div>
    );

}

export default AdvancedSearch;