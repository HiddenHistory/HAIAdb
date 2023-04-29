//EntryMod: lists all entries in the database and allows for modification of the server database and thus the entry pool.

//Imports
import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//Import database class to access methods which allow for communications with database.
import database from '../service/database';


//MODLIST will use a GETALL method to retrieve EVERYTHING in the database.

const EntryMod = props => {
  /*Notes on REACT function organization*/
    //Before reaching the return bloc in any app return section, we may declare any number of variables and work wiht them. REMEMBER THAT!
    //We may accordingly access those variables wiht the syntax { varname } as if it were either html section code or page text (inwhich case, the contents of the value are converted ot a string before input).
    //We can also put in CODE within the curly braces, whose contents or return value will be given in the browser or returned as a Stirng.
    
    //Set of variables for all posisble searchterms
    
    const [entries, setEntries] = useState([])

    //useEffect communicates that the render of this component is not complete even after a page load, so that the page can continue to render
    useEffect(() => {
      //In searching, retrieveEntries will only retrieve the the entries fitting the query. In entryMod, retrieveEntries will retrieve ALL entries.
      retrieveEntries();
    }, []);

    //Method to retrieve the entries from the database, here all possible entries, which would fit the query.
    const retrieveEntries = () => {
      //Metod uses database class to retrieve all entries
      database.getAll()
        //Wait for a response from the database before continuing.
        .then(response => {
          //After retrieving the entries from the database with the getAll method which requests all entries through the backend using an axios middleman (whose link was given in the http-common.js file), we will add that response with the entries to an array, whose contents we can then display to update the total display for our results.
          console.log(response.data);
          setEntries(response.data.entries);
        })
        .catch(error => {
          console.log(error);
        });
    };

    //Add the delete process to this class to send off delete requests.
    const deleteEntry = die =>{
      database.deleteEntry(die.targetValue)
    }

    const updateEntry = change => {
      database.updateEntry()
    }

    const postEntry = add => {
      database.createtEntry()
    }

    //for each of the entry modification thingies, 
  
    return (
      <div className="content">
        Hi
      </div>
    );
  }
  
  //Return the app contents to the file
  export default EntryMod;

  //We want ENTRYMOD to BY DEFAULT send a FIND ALL call to the DATABASE.JS file, WHICH RETRIEVES ALL FILES, and for BUTTONS on the DISPLAYED RESULTS given FROM the DATABASE.JS file to then fire MORE methods from the DATABASE.JS file to MODIFY the general DATABASE.