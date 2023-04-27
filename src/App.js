import Navbar from './navbarcomponent';
import Home from './home';

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
      <Home />
    </div>
  );
}

//Return the app contents to the index.html file.
export default App;
