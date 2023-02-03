import React from 'react';
import {Link} from "react-router-dom";
function HomePage() {
    return (
        <div>
            <div><img src={"img/cnu-worldcup-logo.png"}/></div>
            <div>
            <Link to="/AllCategory">
                    충대맛집월드컵 시작하기
            </Link>
            </div>
            <div>
            <Link to="/AllStore">
                    전체 가게 확인하기
            </Link>
            </div>
            <div>
                    <Link to={`/admin`}>
                        관리자 페이지
                    </Link>
            </div>

        </div>
    );
}

export default HomePage;