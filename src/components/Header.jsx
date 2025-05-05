import React from 'react';
import { Link } from "react-router-dom";
import UserIcon from "../assets/profileIcon.svg";

function Header() {
    return (
        <header>
            <nav>
                <h1>Dara <span style={{color: "var(--secondary-color)"}}>X</span></h1>

                <div className={"nav-links"}>
                    <Link to="/">Wallet</Link>
                    <Link to="/Crypto_Market">Market</Link>
                    <Link to="/Contact">Contact</Link>
                </div>

                <a href="#">
                    <img src={UserIcon} alt="icon"/>
                </a>
            </nav>
        </header>
    )
}

export default Header;
