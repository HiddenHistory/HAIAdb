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
const SearchResults = () => {
/* SEARCH PREPARATION */
  //location will contain values passed in through the search pages.
  const location = useLocation();
  const {type} = useParams();
  const searchData = location.state;
  
  console.log(location.state, "location prop")
  console.log(searchData, "searchData taken from location prop")
  
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
      if(searchData.src !== ""){
        query.push(searchData.src);
        by.push("src")
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
  console.log(query, by, "queryBy");
  

  /*RESULTS USESTATE PREPARATION*/
 
  //Variable decs for results.
  const [entries, setEntries] = useState([]);
  //Contains all displayed objects for the page.
  const [forThisPage, setForThisPage] = useState([]);
  
  /*SEARCH EXECUTION & RESULTS ORGANIZATION*/
    //Takes a "query" array and a "by" array, and uses each to call a search method correspondingly, and parse through data.
    //Page sorting should also take in an array (in query value). If it's an array of results as opposed to an array of query and by data (for a regular search), I want it to behave differently.

  //useEffect indicates that the component is not done acting even after it renders, as it will await updates from the interacitons with the database.
  useEffect(() => {
    dataCall();
  }, []);

  async function dataCall () {

                                                                                                                            //[ignore]QUERY may also contain RESULTS, FOR AN ATTEMPT TO PAGINATE THEM.
    //PT 1: RETRIEVE ALL DATA FOR PAGE
    //If MODE, then we actually still need to SEARCH for entries FROM the database.
    if(mode){
      //If "by" is text, we should execute a regular search looking for matches in ALL fields.
      if(by[0] == "text"){
        EntryDataService.find(query[0], by[0])
          .then(response => {
            console.log(response.data, "text-based all-search");
            mode = false;
            dataRefresh(response.data.results);
          })
          .catch(error => {
            console.log(error)
          })
      }
      //We are NOT doing a text search, BUT there is only ONE thing we're searching by. For this situation, we will use a regular paginated request to the database with a known find.
      else if (by.length == 1) {
          //Call the "find" method of the database, using our query value and the search criterion
        EntryDataService.findPaginated(query[0], by[0], page, entriesPerPage)
          .then(response => {
            console.log(response.data, "single-parameter search");
            setEntries(response.data);
            dataRefresh(response.data.results);
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
            console.log(response.data, "Multiple-parameters advanced search; not yet parsed for all matches.")
            
            //parse through data, determine what to put in final set of entries.

            let matchingSet = []; 
            //For each value in our returned dataset...
            for(let i = 0; i < response.data.results.length; i = i + 1){
              let matching = true;
              //Check against each query. If one query does NOT match, its corresponding object isn't to be added. Move on to next one.
              for(let j = 1; j < query.length && matching == true; j = j + 1){
                //Field with name contained in by[J] of search result "i" could be of types STRING or ARRAY. There are different procedures for each.
                //Case 1: by[J] is a String.
                if(typeof response.data.results[i][by[j]] == "string"){
                  if(response.data.results[i][by[j]] == query[j].toLowerCase()){}
                  else{
                    matching = false;
                  }
                }
                //Case 2: by[J] is an Array.
                else if(Array.isArray(response.data.results[i][by[j]])){
                  //We have an array at the field with name contained in by[J], check if all query values exist in the data
                  for(let k = 0; k < query[j].length && matching == true; k = k + 1){
                    if(response.data.results[i][by[j]].includes(query[j][k].toLowerCase())){}
                    else{
                      matching = false;
                    }
                  }
                }
              }
              //If our data entry DID match, add it to our set of total results.
              if(matching){
                matchingSet.push(response.data.results[i]);
              }
            }
            setEntries(matchingSet);
            console.log(matchingSet, "matchingSet")
            mode = false;
            dataRefresh(matchingSet)
          })
          .catch(error => {
            console.log(error)
          })   
        }
    }
  
  //No need to parse the entire database, simply determine the set of entries for the page.
  else{
    setEntries(searchData.allMatched);
    dataRefresh(searchData.allMatched);
  }
  }

  //Method to set the data for the page based on what was given.
  function dataRefresh(arrayInput) {
    console.log("dataRefresh", arrayInput)
    //PT 2: DETERMINE WHAT TO SHOW ON PAGE OUT OF ALL GIVEN RESULTS
    //Now we will detemermine pagination & what to display on-page.
    
    let forpage = [];
    //If the amount of results (stored to entries in the first part of the method) is equal to or less than the amount of entries per page; we already know what to set our page values to be.
    if(arrayInput.length <= entriesPerPage){
        forpage = [...arrayInput];
    }
    //If the amount of results is NOT equal to the amount of entries per page, we must determine what to show on the page out of a larger set.
    else{
      //Starting at the base for the page number, put things into the page
      for(let i = (page-1)*entriesPerPage; i < entriesPerPage; i++){
        forpage.push(arrayInput[i]);
      }
    }
    //These values will be displayed on the page.
    setForThisPage(forpage);
  }

  return (
    <div>{forThisPage.length}</div>
  )
  }
  //Return the app contents to the file
  export default SearchResults;