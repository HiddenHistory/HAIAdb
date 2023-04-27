//Class with homepage.
//Imports
import { useState } from 'react';

const Home = () => {
    //[value, function that can change value]. Use for default url for each image and potential new url.
    const [name, setName] = useState('new val');

    const handleClick = (e) => {
        console.log('hello bruv', e);
    }

    const handClickAnon = (name, e) => {
        console.log('ello bruv' + ' ' + name + e.target);
    }

    return ( 
        <div className="home">
            <h2>Homepage</h2>
            <button onClick={handleClick}>Click</button>
            <button onClick={(e) => console.log(handClickAnon('goodday', e ))}>Hi</button>
        </div>
     );
}
 
//export default Home;