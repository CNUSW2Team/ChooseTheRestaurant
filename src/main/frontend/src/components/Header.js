import React, {useEffect, useState} from 'react';
import SignOut from "./auth/SignOut";
import {adminGet} from "./auth/AdminUtil";

function Header() {
    const [admin, setAdmin] = useState(false);

    useEffect(() =>{
        adminGet("/auth/admin", setAdmin);
    }, [])


    return (
        <nav className="navbar navbar-expand-md navbar-light bg-light sticky-top">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">충대맛집</a>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="/AllCategory">월드컵</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/AllStore">가게</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/AllMenu">메뉴</a>
                        </li>
                    </ul>
                    <a href="/admin" className={"btn btn-secondary rounded-4 me-2 " + (admin ? "" : "d-none")}>관리자페이지</a>
                    <SignOut ></SignOut>
                </div>
            </div>
        </nav>
    );
}

export default Header;