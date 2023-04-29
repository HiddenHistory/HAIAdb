import { Switch, Route, Link} from "react-router-dom";
import React from "react";

//Component for the nav bar, which will be shared by all webpages in site.
const Navbar = () => {
    return ( 
        <nav className="navbar">
            <div className="links">
                <a href="/home">Home</a>
                <a href="/entryMod" style={{
                    color:"white",
                    backgroundColor: '#f1356d',
                    borderRadius: '8px'
                }}>make entries</a>
                <a href="/about">About</a>
                <a href="/advsearch">Advanced Search</a>
                <a href="https://www.youtube.com/channel/UCaIHjtxqn6_ej_jNLUXMeiw">youtube</a>
            </div>
        </nav>
    );
}
 
export default Navbar;