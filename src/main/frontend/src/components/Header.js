import React from 'react';

function Header() {
    return (
        <nav className="navbar navbar-expand-md navbar-light bg-light mb-auto sticky-top">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">CNU-WorldCup</a>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="/AllCategory">카테고리</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/AllStore">가게</a>
                        </li>
                    </ul>
                    <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    );
}

export default Header;