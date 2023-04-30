//EntryMod: lists all entries in the database and allows for modification of the server database and thus the entry pool.

//Imports
import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { countryList } from '../dev/countryList.js'

//Import database class to access methods which allow for communications with database.
import database from '../service/database';

const EntryMod = props => {

  let country_toISO = countryList;
  /*Notes on REACT function organization*/
    //Before reaching the return bloc in any app return section, we may declare any number of variables and work wiht them. REMEMBER THAT!
    //We may accordingly access those variables wiht the syntax { varname } as if it were either html section code or page text (inwhich case, the contents of the value are converted ot a string before input).
    //We can also put in CODE within the curly braces, whose contents or return value will be given in the browser or returned as a Stirng.
    
    //Set of variables for all posisble searchterms
    
    const [commands, setCommands] = useState([])
    const [text, setText] = useState("");

    //useEffect communicates that the render of this component is not complete even after a page load, so that the page can continue to render

    //Add the delete process to this class to send off delete requests.
    const deleteEntry = die =>{
      database.deleteEntry(die)
            .catch(error => {
              console.log(error);
              setCommands([String.toString(error), ...commands]);
            });
    }

    const updateEntry = change => {
      let updateObj = {}
      //Check input and if any invalids then return (end)
      
      database.updateEntry();
      
    }

    const postEntry = add => {
      let addObj = {}
      let hid;
      //check input and if any invalids then return (end)
        
      //If the post-entry is valid, then we will generate an hid.
      //First, retrieve any potentially matching hid vales from the database through a simple search query by hid.
      database.find(addObj.hid, hid)
          .then(response => {
            console.log(response.data.results)
            let i = response.data.results.length;
            //...
            database.createEntry(addObj);
          })
          .catch(error => {
            console.log(error)
          })
    }

    function commandSend(string){
      //this is a delete request
      if(string.substring(0,7) =='delete:'){
        console.log('delete request');
      }
      //this is a slice request
      else if(string.substring(0,7) =='update:'){
        console.log('update request');
      }
      //this is a post request.
      else if(string.substring(0,4) =='post:'){
        console.log('post request');
      }
      else if(string.substring(0,4) =='clear'){
        setCommands([]);
      }
      
    }
    //Use a FIFO queue to process dat.

    //for each of the entry modification thingies, 
  
    return (
      <div className="content">
        This is the backend, the back of things.
        <input  type="text"
                className="barMod"
                placeholder=""
                value={text}
                onChange={e => setText(e.target.value)}
                onKeyUp={e => 
                  {if(e.key == 'Enter'){
                    commandSend(text);
                    setCommands([text, ...commands]);
                    setText("");
                    console.log("Enter pressed");
                  }}
                }
        />
        <button className="barMod"
                onClick={ () =>{
                  commandSend();
                  setCommands([text, ...commands]);
                  setText("");
                }
                  }/>




      </div>
    );
  }
  
  //Return the app contents to the file
  export default EntryMod;

  //We want ENTRYMOD to BY DEFAULT send a FIND ALL call to the DATABASE.JS file, WHICH RETRIEVES ALL FILES, and for BUTTONS on the DISPLAYED RESULTS given FROM the DATABASE.JS file to then fire MORE methods from the DATABASE.JS file to MODIFY the general DATABASE.