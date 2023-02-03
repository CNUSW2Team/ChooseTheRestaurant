import React from 'react';
import {Link} from "react-router-dom";

function Header(props) {
    return (
        <div>
            <div>
            <Link to="/">
                <h1>CNU WorldCup</h1>
            </Link>
            </div>
        </div>


    );
}

export default Header;