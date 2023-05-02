//Imports
import React from "react";

//Allow for rendering and value changes of html elements
import { useState, useEffect } from "react";
//Meant to manage the prop (passed-in value from the searchbar)
import { Link, useParams, useLocation } from "react-router-dom";
//Access value passed through search query method.

import Navbar from '../components/navbarcomponent';
//Import database class which allows for communications with database in the case that one is needed.
import EntryDataService from '../service/database';

function Entry(props) {
    //Before reaching the return bloc in any app return section, we may declare any number of variables and work wiht them. REMEMBER THAT!
    //We may accordingly access those variables wiht the syntax { varname } as if it were either html section code or page text (inwhich case, the contents of the value are converted ot a string before input).
    //We can also put in CODE within the curly braces, whose contents or return value will be given in the browser or returned as a Stirng.
    

    //Opening program to arrange things before getting to the useState.
    var params = useParams(); //params = location.state?.id ? null : useParams();
    const location = useLocation();

    //Would rather use the location state, if there is one, than reaccess te database. As such, if there is a location state, do not use the parameters.
    if(location.state?.hid){
      params = null;
    }

    //State variables.
    const [entry, setEntry] = useState({});

    //Use-effect method, to fire once to both retrieve corresponding entry for ID
    useEffect(() => {
      getEntry()
    }, []);

    async function getEntry() {
      //If the params value has not been overwritten, this means we should use it for locating the entry in question.
      if(params){
        EntryDataService.get(params.hid, "hid")
          .then(response => {
            console.log(response.data, "response retrieved from database.")
            setEntry(response.data.results[0]);
          })
          .catch(error => {
            console.log(error)
          });
      }
      //We actually do have a location.state object with an hid input and hopefully a set of entries. Use it to locate the value in the entries array.
      else{
        try{
        let i = 0;
        let found = false;
        while(i < location.state.entries.length){
          //We've found a match!
          if(location.state.entries[i].hid == location.state.hid){
            found = true;
            break
          }
          //We've not found a match. Continue checking
          else{
            i = i+1;
          }
        }
          if(found == true)
            setEntry(location.state.entries[i])
          else
            throw new Error("Was not found in the given input?")
        }
        catch(error){
          console.log(error)
        }
      }
    }
    
    const title = "View an entry";
  
    //IF something has been passed into the entry at URL (from searchResults), use that for the get method to retrieve the corresponding value
    //If not, use the actual entry URL for the parameter to get something from the database.
  
    return (
      <div>
        <div className = "top">
                <div className="homeBar">
                    <span className="siteHeadSmall"> - HAIA entry - </span>
                </div>
                <div className="navCont">
                {/*Navbar component, not including search-bar.*/}
                <Navbar />
                <div className="horzLine"/>
                <div className="spacer"/>
                </div>
          </div>
          <div className="horzLine"/>
        <div className="indvContent" id="ENTRYCONTENT">
          <div class="entryLeft">
          <h4 id="ENTRYTITLE">{entry.title}</h4>
          <img src={entry.url} id="ENTRYIMG"></img>
          </div>
          <div class="entryRight">
            <h4 id="ENTRYTITLE">{entry.src}</h4>
            <p id="ENTRYTITLE">{entry.hid}</p>
          </div>
        </div>
      </div>
    );
  }
  
  //Return the app contents to the file
  export default Entry;