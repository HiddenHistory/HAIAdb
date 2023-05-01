//Class with homepage.
//**If entrylist does NOT import, check to make sure you have not MOVED it to dev. */
//Imports
import { useState, useEffect } from 'react';
import Entrylist from './dev/entrylist';
import SearchBar from './components/searchbar';

const Home = () => {
    const[entries, queryResults] = useState([
        { title: 'dwa', body:'bod', author: 'auth', id: 1 },
        { title: 'two', body:'bod2', author: 'auth', id: 2 },
        { title: 'three', body:'bod3', author: 'auth', id: 3 }
    ]);

    const handleDelete = (id) => {
        const newEntries = entries.filter(entry => entry.id !== id)
        queryResults(newEntries);
    }

    return ( 
        <div className="home">
            <SearchBar/>
            <Entrylist entries={entries} handleDelete={handleDelete}/>
        </div>
     );
}
 
export default Home;