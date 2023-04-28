//Framework imports
import React from "react";
//Component imports
import Navbar from './components/navbarcomponent';
//Page imports
import Home from './home';
import Entry from './pages/entry';
import Search from './pages/search';
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
        //This section controls movement between a series of routes, each of which corresponds to an html page which will control what displays in the webpage body.
      }
      <Routes>
        {
          //Homepage route, given the paths (urls) "/" (default/empty) and "Home" (for obvious reasons). Uses the imported "home" component for rendering.
        }
        <Route path={'/'} element={<Home/>} />
        <Route path={'/Home'} element={<Home/>} />

        {
          //entryMod route, given the path (url) "/entryMod". Uses the imported EntryMod component for rendering.
        }
        <Route path ={'/entryMod'} element={<EntryMod/>} />

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
          //Search route for a specific search page. Add later.
        }
            {/*
        <Route path={"/search"} element={<Search/> />
            */}
        {
        //<Home />
        }
      </Routes>
    </div>
  );
}

//Return the app contents to the index.html file.
export default App;
