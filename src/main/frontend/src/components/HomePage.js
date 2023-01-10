import React from 'react';
import {Link} from "react-router-dom";

function HomePage(props) {
    return (
        <Link to="/AllCategory">
            <p>충대맛집월드컵 시작하기</p>
        </Link>
    );
}

export default HomePage;