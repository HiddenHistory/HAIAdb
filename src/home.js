//Class with homepage.
//**If entrylist does NOT import, check to make sure you have not MOVED it to dev. */
//Imports

//Image Imports
import logo from "./img/haia.png"


import "./style/haiastyles.css"

//Component Imports-> React
import {NavLink} from "react-router-dom";

import { Link } from "react-router-dom";
//Component Imports-> HAIA
import Navbar from './components/navbarcomponent';
import SearchBar from './components/searchbar';

//Method Imports->React
import { useState, useEffect } from 'react';

//Other imports
import Entrylist from './dev/entrylist';

const Home = () => {

    return ( 
        <div className="home">
            <div className = "top">
                <div className="homeBar">
                    <img src={logo}/>
                    <span className="horzDiv vertCenter"/>
                    <span className="siteHead vertCenter">Hidden's African Image Archive</span>
                </div>
                <div className="navCont">
                {/*Navbar component, not including search-bar.*/}
                <Navbar />
                <div className="horzLine"/>
                <div className="sectionLine"/>
                </div>
            </div>
                <div className="background mainBody">
                    <div className="transBox">
                        <p id="HAIATITLE"><mark className="colorWhite">HAIA</mark> - africa images archive
                        <SearchBar id="HOMESEARCH"/></p>
                    </div>
                </div>
        </div>
     );
}
 
export default Home;