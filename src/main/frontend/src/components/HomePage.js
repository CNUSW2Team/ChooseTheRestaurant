import React from 'react';
import {Link} from "react-router-dom";
function HomePage() {
    return (
        <div style={{textAlign: "center", position:"fixed", top:"50%", left:"45%"}}>
            <Link to="/AllCategory">
                <div>
                    <p>충대맛집월드컵 시작하기</p>
                </div>
            </Link>
            <Link to="/AllStore">
                <div>
                    <p>전체 가게 확인하기</p>
                </div>
            </Link>

        </div>
    );
}

export default HomePage;