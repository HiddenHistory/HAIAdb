//searchReults: displays results of a given search after being redirected to after a search query is made.

//Imports
import React from "react";
//Allow for rendering and value changes of html elements
import { useState, useEffect } from "react";
//Meant to manage the prop (passed-in value from the searchbar)
import { Link, useParams, useLocation } from "react-router-dom";
//Access value passed through search query method.


//Import database class which allows for communications with database.
import EntryDataService from '../service/database';

//Takes in a set of props (inputs) from the search request which it will use when requesting things from the database for the results display.
const SearchResults = (props) => {

  //location will contain values passed in through the search pages.
  const location = useLocation();
  const {type} = useParams();
  const od = location.state;
  
  console.log(location.state, -1)
  console.log(od, +5)

  
  const keywordsToArr = () => {
    let keywordArray = [];
    let currString = "";
    for(let i = 0; i < od.keywords.length;i = i + 1){
        if(od.keywords.charAt(i) != ','){
            if(od.keywords.charAt(i) != ' '){
                currString = currString + od.keywords.charAt(i);
            }
        }
        else{
            keywordArray.push(currString);
            currString = '';
        }
    }
    if(currString !== ""){
      keywordArray.push(currString);
    }
    return keywordArray;
  }

  const o = keywordsToArr();
  console.log(o);

  //Add fields to this when I switch from the dummy data to the proper data
  const [entries, setEntries] = useState([]);
  const [forThisPage, setForThisPage] = useState([]);

  //The amount of entries per page will be contained in te prop value, we will use 10 as a substitute. "found" should also be updated to be equal to something from the prop.
  const entriesPerPage = 10;
  const found = false;

  //query-by array keys
  //Takes a "query" array and a "by" array, and uses each to call a search method correspondingly, and parse through data.
  //Page sorting should also take in an array (in query value). If it's an array of results as opposed to an array of query and by data (for a regular search), I want it to behave differently.

      //useEffect indicates that the component is not done acting even after it renders, as it will await updates from the interacitons with the database.
  useEffect(() => {
    retrieveEntries(null, null, null, found);
  }, []);

  //QUERY may also contain RESULTS.
  const retrieveEntries = (query, by, page, found) => {

    //Variable decs for results display.
    //Contains all displayed objects for the page.
    //entriesperpage value, will eventually be retrieved from the prop

    //PT 1: RETRIEVE ALL DATA FOR PAGE
    //If NOT FOUND; variable "FOUND" tracks whether or not we have already parsed the database for relevant results. IF we have, those results will be contained in the "query" value already, and all we need to do is paginate them.
    if(!found){
      //If there was no "by" value (USE DEFAULT BY "-1" FOR NO BY TERM INSEARCH), then this means we executed a regular search. Process by retrieving the whole database and parsing all data for a match in ANY field. This will be transformed into an array which will be paginated
      if(/*by.length==*/-1){
        EntryDataService.getAll()
          .then(response => {
            console.log(response.data);
            console.log(-1);
            let matchingSet = [];
            //Parse through the entire returned array of all entries to look for those with a match in any field. Place those into an array which will contain all search results.
              //if the contents in the total response (retrieved from response.data.entries) have ANY field with a query match, add that to the matching set
            //We have determined a matching set, add that to the final database.
            setEntries(matchingSet);
          })
          .catch(error => {
            console.log(error)
          })
      }
      //There was ONE "by" value
      else if (/*by.length == */1) {
          //Call the "find" method of the database, using our query value and the search criterion
        EntryDataService.find(query[0], by[0], page)
          .then(response => {
            console.log(response.data);
            setEntries(response.data.entries);
          })
          .catch(error => {
            console.log(error)
          });
      }
      //Multiple "by" queries
      else {
        EntryDataService.getAll()
          .then(response => {
            console.log(response.data)
            //parse through data, determine what to put in final set entries.
            let matchingSet = [];
              //For loop here.
            setEntries(matchingSet);
          })
          .catch(error => {
            console.log(error)
          })
      }
      let forpage = [];
      //PT 2: DETERMINE PRESENTATION FOR PAGE. COPY OVER APPROPRIATE CONTENTS FROM ARRAY OF TOTAL ENTRIES. THIS WILL BE WHAT IS DISPLAYED ON THE PAGE.
      for(let i = 0; i< entriesPerPage /*&& query.length*/ ; i++){
        forpage.push(entries[i]);
      }
      setForThisPage(forpage);
      found = true;
    }

    //No need to parse the entire database, simply determine the set of entries for the page. 
      //We will parse through this QUERY value to determine what to display on the given page.
    else{
      let forpage = [];
      //DETERMINE PRESENTATION FOR PAGE
      for(let i = 0; i < entriesPerPage /*&& query.length*/; i++){
        //for each in the array, add the corresponding one relative to the page
      }
      setForThisPage(forpage);
    }
  }

  return (2
    //There should be a button somewhere that initiates a new search query using the same conditions as before but with the page value incremented, to display the next set of search results.
  )
  }
  //Return the app contents to the file
  export default SearchResults;