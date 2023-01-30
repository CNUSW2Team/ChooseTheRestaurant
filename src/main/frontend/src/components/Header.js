import React from 'react';
import {Link} from "react-router-dom";

function Header(props) {
    return (
        <div>
            <div style={{float:"left", position:"relative", top:"-50px"}}>
            <Link to="/">
                <h1>CNU WorldCup</h1>
            </Link>
            </div>
            <div style={{float:"right"}}>
                <Link to={`/admin`}>
                    <button>관리자 페이지</button>
                </Link>
            </div>
        </div>


    );
}

export default Header;