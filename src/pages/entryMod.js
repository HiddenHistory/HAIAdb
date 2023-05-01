//EntryMod: lists all entries in the database and allows for modification of the server database and thus the entry pool.

//Imports
import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import countryList from '../dev/countryList.js';
import idNames from '../dev/idNames.js';
import '../style/devstyle.css'

//Import database class to access methods which allow for communications with database.
import database from '../service/database';

const EntryMod = props => {

  const country_toISO = countryList;
  const idfromName = idNames;
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
      die = die.substring(7);
      console.log(die)
      if(die.length == 24){
        database.deleteEntry(die)
              .catch(error => {
                console.log(error);
                setCommands([String.toString(error), ...commands]);
              });
          }
      else{
        setCommands(["Invalid deletion request!"])
      }
    }

    const updateEntry = change => {
      let updateBody = change.substring(7);
      try{
        let updateObj = JSON.parse(updateBody);
        let updated;

        //Check for essential properties. If any invalids then return (end)
        if("hid" in updateObj){
          //Retrieve the object to be updated, or throw an error if it was not found.
          database.get(updateObj.hid, "hid")
                .then(response => {
                    console.log(response.data.results);
                    //Update using the merging of the original object and the new set of contents, overwriting older contents which conflict.
                    updated = {...response.data.results[0], ...updateObj}
                    //Update our log of commands.
                    setCommands([JSON.stringify(response.data.results[0]) + '=>' + JSON.stringify(updated), ...commands]);
                    database.updateEntry(updated);
                })
                .catch(error => {
                  console.log(error)
                  setCommands(["Entry does not exist in the database!", ...commands,])
                })
        }
        else{
          setCommands([JSON.stringify(updateObj), "Invalid input!", ...commands])
          console.log("Invalid input!", updateObj)
        }
    }
    catch(error){
      setCommands([...commands, updateBody,"Invalid Input"])
      console.log("Invalid input!", updateBody)
    }
    }

    const postEntry = add => {
      let addBody = add.substring(5);
      try{
        let addObj = JSON.parse(addBody);

        if(addObj.hasOwnProperty("title") && "src" in addObj && "keywords" in addObj && "url" in addObj && "country" in addObj){
        //If the post-entry is valid, then we will generate an hid.
        //Retrieve country code
        let tempHID = '';
          if(country_toISO[addObj.country]){
            tempHID = country_toISO[addObj.country]
          }
          else{
            setCommands("Invalid country input!", ...commands)
            return
          }
          //Use source to generate a book-code for the entry.
          if(addObj.shortsrc){
            tempHID = tempHID + idfromName[addObj.shortsrc.toUpperCase()];
          }
          else{
            tempHID = tempHID + idfromName[addObj.src.toUpperCase()]
          }
          //First, retrieve any potentially matching hid vales from the database through a simple search query by hid, unpaginated.
          database.find(tempHID, "hid")
              .then(response => {
                console.log(response.data.results)
                //Then, use the size of the resulting set of HIDs to determine the numerical value to follow the base-tempHID (specifically, how many 0s.).
                let i = (response.data.results.length + 1) + '';
                for(let o = i.length; o < 4; o++){
                  i = '0' + i;
                }
                addObj.hid = tempHID + i;
                database.createEntry(addObj);
              })
              .catch(error => {
                console.log(error)
              })
          }
          else{
            setCommands([JSON.stringify(addObj), ...commands]);
            console.log("Invalid Input!", addObj)
          }
      }
      catch(error){
        setCommands([addBody,"Invalid Input", ...commands]);
        console.log("Invalid Input!", addBody)
      }
    }

    //Method meant to remove command request, since we already have determined that & acted appropriately.
    /*function requestChop(string, to){
      return string.substring(to)
    }*/
    
    /*//Method meant to determine the individual fields
    function fieldQuery(string, param){

    }*/

    function commandSend(string){
      //this is a delete request
      if(string.substring(0,7) =='delete:'){
        console.log('delete request');
        deleteEntry(string);
      }
      //this is a slice request
      else if(string.substring(0,7) =='update:'){
        console.log('update request');
        updateEntry(string);
      }
      //this is a post request.
      else if(string.substring(0,5) =='post:'){
        console.log('post request');
        postEntry(string);
      }
      else if(string == 'clear'){
        console.log('clear request');
      }
      
    }
    //Use a FIFO queue to process dat.

    //for each of the entry modification thingies, 
  
  return (
<div className ="developerPage">                          {/* Encompassing div to wrap all contained elements*/}
        
        {/*Div to contain the input history to the console.*/}
        <div className="consoleLog">
        {  commands.map((entry, keyval) => (
            <div className="indvLog" key={keyval}>
              {entry}
            </div>
          ))
        }
        </div>

        {/*Div to contain the actual input bar.*/}
        <div className="barMod">
            {/*Command input*/}
            <input  className="bar"
                    type="text"
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
          {/*Button in case you want to press a button to send the input*/}
          <button   onClick={ () =>
                      {commandSend(text);
                       setCommands([text, ...commands]);
                       setText("");
                      }
          }/>
          </div>
</div>);
}
  
  //Return the app contents to the file
  export default EntryMod;

  //We want ENTRYMOD to BY DEFAULT send a FIND ALL call to the DATABASE.JS file, WHICH RETRIEVES ALL FILES, and for BUTTONS on the DISPLAYED RESULTS given FROM the DATABASE.JS file to then fire MORE methods from the DATABASE.JS file to MODIFY the general DATABASE.