import React from 'react';
import {Link} from "react-router-dom";
function HomePage(props) {
    return (
        <>  
            <Link to="/AllCategory">
                <div>
                    <p>충대맛집월드컵 시작하기</p>
                </div>
            </Link> 
        </>
    );
}

export default HomePage;