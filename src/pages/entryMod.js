//EntryMod: lists all entries in the database and allows for modification of the server database and thus the entry pool.

//Imports
import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//Import database class to access methods which allow for communications with database.
import database from '../service/database';

const EntryMod = props => {
  /*Notes on REACT function organization*/
    //Before reaching the return bloc in any app return section, we may declare any number of variables and work wiht them. REMEMBER THAT!
    //We may accordingly access those variables wiht the syntax { varname } as if it were either html section code or page text (inwhich case, the contents of the value are converted ot a string before input).
    //We can also put in CODE within the curly braces, whose contents or return value will be given in the browser or returned as a Stirng.
    
    //Set of variables for all posisble searchterms
    
    const [commands, setCommands] = useState([])
    const [text, setText] = useState("");

    //useEffect communicates that the render of this component is not complete even after a page load, so that the page can continue to render
    useEffect(() => {
      
    
    const keyPress = key => {
      console.log('Key pressed', key.key)
      
      if(key.key === 'Enter'){
        key.preventDefault();
        
        function f() {
        if(text.length > 5){
        //check if a command was input instead.
          if (text.substring(0, 7) == 'delete:'){
            //deleteEntry(text);
            console.log("deleteReq");
          }
          if (text.substring(0, 7) == 'update:'){
            //updateEntry(text);
            console.log("updateReq");
          }
          if (text.substring(0, 4) == 'post:'){
            //postEntry(text);
            console.log("postReq");
          }
        }
        setCommands(commands => [text, ...commands])
        setText('')
        }
        f();
      }
      
    document.addEventListener("keydown", keyPress)
    }
    });

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
        This is the backend, the back of things.
        <input  type="text"
                className="barMod"
                placeholder=""
                value={text}
                onChange={e => setText(e.target.value)}
        />


      </div>
    );
  }
  
  //Return the app contents to the file
  export default EntryMod;

  //We want ENTRYMOD to BY DEFAULT send a FIND ALL call to the DATABASE.JS file, WHICH RETRIEVES ALL FILES, and for BUTTONS on the DISPLAYED RESULTS given FROM the DATABASE.JS file to then fire MORE methods from the DATABASE.JS file to MODIFY the general DATABASE.