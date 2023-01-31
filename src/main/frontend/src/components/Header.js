import React from 'react';
import {Link} from "react-router-dom";

function Header(props) {
    return (
        <div>
            <div style={{width:"15%", textAlign: "center", margin:"0 auto"}}>
            <Link to="/">
                <h1>CNU WorldCup</h1>
            </Link>
            </div>
        </div>


    );
}

export default Header;