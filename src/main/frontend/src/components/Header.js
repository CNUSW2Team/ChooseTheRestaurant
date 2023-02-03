import React from 'react';
import {Link} from "react-router-dom";

function Header(props) {
    return (
        <div>
            <ul>
                <Link to={`/AllCategory/*`}><li>카테고리</li></Link>
                <Link to={`/AllCategory/*`}><li>카테고리</li></Link>
                <Link to={`/AllCategory/*`}><li>카테고리</li></Link>
                <Link to={`/AllCategory/*`}><li>카테고리</li></Link>
                <Link to={`/AllCategory/*`}><li>카테고리</li></Link>
                <Link to={`/AllCategory/*`}><li>카테고리</li></Link>
            </ul>

            {/*<Link to="/">*/}
            {/*    <h1>CNU WorldCup</h1>*/}
            {/*</Link>*/}

        </div>


    );
}

export default Header;