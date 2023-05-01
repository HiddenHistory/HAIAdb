import { Switch, Route, Link} from "react-router-dom";
import React from "react";
import "../style/haiastyles.css";
import SearchBar from './searchbar';
import youtubeLogo from "../img/youtubelogo.svg"

//Component for the nav bar, which will be shared by all webpages in site.
const Navbar = () => {
    return ( 
        <div className = "navWrap">
        <nav className="navbar">
                <ul className="navbarItem"><a href="/home">Home</a></ul>
                {
                //<a href="/about">About</a>
                }
                <ul className="navbarItem"><a href="/advsearch">Advanced Search</a></ul>
                <ul className="navbarItem"><a href="https://www.youtube.com/channel/UCaIHjtxqn6_ej_jNLUXMeiw">Youtube{/*<img src={youtubeLogo}/>*/}</a></ul>
                <ul className="navbarItem"><a href="/entryMod">entryMod</a></ul>
            
            
            
        </nav>
        </div>
    );
}
 
export default Navbar;