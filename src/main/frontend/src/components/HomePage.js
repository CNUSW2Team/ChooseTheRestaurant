import React from 'react';
import {Link} from "react-router-dom";

function HomePage(props) {
    return (
        <Link to="/AllStore">
            시작하기
        </Link>
    );
}

export default HomePage;