import React from "react";
import './index.css'


const Header = () => {
    return(
        <>
        <div className="header-container">
            <div className="header">
                <h3>VENIA</h3>
                    <ul>
                        <li>Home</li>
                        <li>Women</li>
                        <li>Men</li>
                        <li>smart Gear</li>
                    </ul>
                <div>Cart<sup>24</sup></div>
            </div>
        </div>
        <div className="banner">
            <h1>Men's Outerwear</h1>
        </div>
        </>
    )
}

export default Header