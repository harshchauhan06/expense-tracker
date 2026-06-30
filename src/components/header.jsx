import React from "react";
import './header.css';
import cashImage from '../assets/Tcash.png';

function Header() {
  return (
    <header>
    <div className="title-container">
    <img
        src={cashImage}
        alt="cash"
        className="cash-image"
    />

    <div className="title-text">
        <h1 className="app-title">Expense Tracker</h1>
        <p className="tag-line">Track smarter. Spend wiser.</p>
    </div>
</div>
    </header>
  );
}

export default Header;