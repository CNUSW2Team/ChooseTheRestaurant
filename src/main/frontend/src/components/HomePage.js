import React from 'react';
import {Link} from "react-router-dom";
function HomePage() {
    return (
        <div style={{textAlign: "center", paddingTop:"50px", display:"flex", flexFlow:"column", "justify-content":"space-between"}}>
            <div style={{padding:"50px"}}><img src={"img/cnu-worldcup-logo.png"} width={350}/></div>
            <div style={{margin:"10px"}}>
            <Link to="/AllCategory">
                    충대맛집월드컵 시작하기
            </Link>
            </div>
            <div style={{margin:"10px"}}>
            <Link to="/AllStore">
                    전체 가게 확인하기
            </Link>
            </div>
            <div style={{margin:"10px"}}>
                    <Link to={`/admin`}>
                        관리자 페이지
                    </Link>
            </div>

        </div>
    );
}

export default HomePage;