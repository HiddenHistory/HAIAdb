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
/* SEARCH PREPARATION */
  //location will contain values passed in through the search pages.
  const location = useLocation();
  const {type} = useParams();
  const searchData = location.state;
  
  console.log(location.state, -1)
  console.log(searchData, +5)
  
  const keywordsToArr = () => {
    let keywordArray = [];
    let currString = "";
    for(let i = 0; i < searchData.keywords.length;i = i + 1){
        if(searchData.keywords.charAt(i) != ','){
            if(searchData.keywords.charAt(i) != ' '){
                currString = currString + searchData.keywords.charAt(i);
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

  //Access already-given & guaranteed values from the input prop. If these don't exist, we have a problem.
  var entriesPerPage = searchData.entriesPerPage;
  var page = searchData.page;
  var mode = searchData.mode;

  const query = [];
  const by = [];
  //Determine which search terms and parameters have been given.
  //create a query array which is a set of search terms, alongside a corresponding "by" array.
  const queryBy = () => {
    //If we have a TEXT field in our passed-in searchData prop, then we don't actually need to check for other input fields, because this means we're doing a basic search.
    if(searchData.text !== undefined){
      query.push(searchData.text);
      by.push("text");
    }
    //We DONT have a text field in our passed-in searchData prop, indicating an advanced search, and thereby need to check for what input fields DO exist.
    else{
      //Do we have an input title? If so, add it to the query and add "title" to the set of search conditions.
      if(searchData.title !== ""){
        query.push(searchData.title)
        by.push("title")
      }
      if(searchData.source !== ""){
        query.push(searchData.source);
        by.push("source")
      }
      if(searchData.keywords !== ""){
        query.push(keywordsToArr());
        by.push("keywords");
      }
    }
  }

  //If we need to access the database, we create an array of queries and what we are queryin by. These will be used to influence how the database is accessed.
  if(mode){
    queryBy();
  }
  console.log(query, by);
  

  /*RESULTS USESTATE PREPARATION*/

  //Variable decs for results.
  const [entries, setEntries] = useState([]);
  //Contains all displayed objects for the page.
  const [forThisPage, setForThisPage] = useState([]);
  
  //useEffect indicates that the component is not done acting even after it renders, as it will await updates from the interacitons with the database.
  useEffect(() => {
    /*SEARCH EXECUTION & RESULTS ORGANIZATION*/
    //Takes a "query" array and a "by" array, and uses each to call a search method correspondingly, and parse through data.
    //Page sorting should also take in an array (in query value). If it's an array of results as opposed to an array of query and by data (for a regular search), I want it to behave differently.

    //QUERY may also contain RESULTS.

      //PT 1: RETRIEVE ALL DATA FOR PAGE
      //If MODE, then we actually still need to SEARCH for entries FROM the database.
      if(mode){
        //If there was no "by" value, then this means we executed a regular search and should check against ALL fields & keywords.
        if(by.length == 0){
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
        //There was ONE "by" value, letting us initiate a regular search with parameter.
        else if (by.length == 1) {
            //Call the "find" method of the database, using our query value and the search criterion
          EntryDataService.findPaginated(query[0], by[0], page)
            .then(response => {
              console.log(response.data, 2);
              setEntries(response.data.entries);
            })
            .catch(error => {
              console.log(error)
            });
        }
        //Multiple "by" queries. Take these EXCLUSIVELY, so ALL requirements must be fulfilled for entry to be included.
        else {
          //Retrieve all entries fitting the first given criteria.
          EntryDataService.find(query[0], by[0])
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
  }, []);

  return (2
    //There should be a button somewhere that initiates a new search query using the same conditions as before but with the page value incremented, to display the next set of search results.
  )
  }
  //Return the app contents to the file
  export default SearchResults;