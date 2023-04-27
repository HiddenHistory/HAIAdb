//Class with homepage.
//Imports
import { useState } from 'react';

const Home = () => {
    const[entries, setEntries] = useState([
        { title: 'dwa', body:'bod', author: 'auth', id: 1 },
        { title: 'two', body:'bod2', author: 'auth', id: 2 },
        { title: 'three', body:'bod3', author: 'auth', id: 3 }
    ]);

    return ( 
        <div className="home">
            {entries.map((blog) => (
                <div className="blog-preview" key={blog.id}>
                    <h2>{blog.title}</h2>
                    <p>writtenby {blog.author}</p>
                    <p>id: {blog.id}</p>
                </div>
            ))}    
        </div>
     );
}
 
export default Home;