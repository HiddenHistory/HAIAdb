//Framework imports
import React from "react";
//Component imports
import Navbar from './components/navbarcomponent';
import SearchBar from './components/searchbar';
//Page imports
import Home from './home';
import Entry from './pages/entry';
import SearchResults from './pages/searchResults';
import AdvSearch from './pages/advancedSearch';
import EntryMod from './pages/entryMod';

import { Routes, Route, Link} from "react-router-dom";

//The actual contents of the webpage are contained in the app.js file, within this function. The contents of this function are returned to the index.html file.
//Note that because this is in a js file, some tags are different than in raw html and are accordingly converted when sent over to the html file.
//        className -> class , as "class" is a RESERVED javascript term.
//        
function App() {
  //Before reaching the return bloc in any app return section, we may declare any number of variables and work wiht them. REMEMBER THAT!
  //We may accordingly access those variables wiht the syntax { varname } as if it were either html section code or page text (inwhich case, the contents of the value are converted ot a string before input).
  //We can also put in CODE within the curly braces, whose contents or return value will be given in the browser or returned as a Stirng.
  const title = "Welcome to Hidden's African Image Archive!";


  return (
    <div className="content">
      <Navbar />
      {
        //This section controls movement between a series of routes, each of which corresponds to an js docuemnt encoding for an html page body, which will control what displays in the client page.
      }
      <Routes>
        {
          //If I am on the home page, display the contents of the Home class.
        }
        <Route path={'/'} element={<Home/>} />
        <Route path={'/Home'} element={<Home/>} />


        {
          //If I am on advsearch, display the contents of the advsearch class.
        }
        <Route path={"/advsearch"} element={<AdvSearch/>} />
        {
          //If I am on searchResults, display the contents of the searchresults class. This takes in props given by the search components (either advancedsearch.js OR searchbar)
        }
        <Route path={'/search:find'} element={<SearchResults/>} />



        {
          /*entry route, given the path (url) "/entry" and a given id. Is not an EXACT path because we want the ":id" section to be malleable for different entries. Uses PROPS to specify entry in the query.
              the render is not controlled simply using a component part like with Home, but instead by using a specific render function which passes in props. The props will initiate a method call in Entry, which will in turn determine which entry to display.
          */
        }
        <Route path ={'/entry/:id'}
            render={(props) => (
              <Entry {...props} />
            )}
            />
        
        {
          //If I am on the entryMod page, display the contents of the entryMod class.
        }
        <Route path ={'/entryMod'} element={<EntryMod/>} />


      </Routes>
    </div>
  );
}

//Return the app contents to the index.html file.
export default App;


  //Non-switch homepage //<Home />