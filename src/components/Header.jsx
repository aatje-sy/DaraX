import React from 'react';
import {Link, Route, Routes} from "react-router-dom";
import UserIcon from "../assets/profileIcon.svg";
import Market from "./CryptoOverview.jsx";

function Header() {
    return (
        <>
            <header>
                <nav>
                    <h1>Dara <span style={{color: "var(--secondary-color)"}}>X</span></h1>

                    <div className={"nav-links"}>
                        <Link to="/">Wallet</Link>
                        <Link to="/crypto_Overview">Market</Link>
                        <Link to="/Contact">Contact</Link>
                    </div>

                    <a href="#">
                        <img src={UserIcon} alt="icon"/>
                    </a>
                </nav>
            </header>

            <Routes>
                <Route path="/Wallet" element={<h1>Wallet</h1>}/>
                <Route path="/crypto_Overview" element={<Market/>}/>
                <Route path="/Contact" element={<h1>Contact</h1>}/>
            </Routes>
        </>


    )
}

export default Header