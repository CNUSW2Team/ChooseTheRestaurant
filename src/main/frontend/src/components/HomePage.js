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
            <Link to="/AllStore">
                <div>
                    <p>전체 가게 확인하기</p>
                </div>
            </Link>
            <Link to={`/admin`}><button>관리자 페이지</button></Link>
        </>
    );
}

export default HomePage;