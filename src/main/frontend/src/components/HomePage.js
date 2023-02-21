import React from 'react';
import {Link} from "react-router-dom";

function HomePage() {
    return (
        <div className='min-vh-100' style={{backgroundColor:"#E7DDF7"}}>
            <main className="position-absolute top-50 start-50 translate-middle text-center">
                <h1 className="mb-5">로고로고</h1>
                <p className="lead"> 오늘 무엇을 먹을지 고민중이신가요? </p>
                <p className="lead"> 다른 사람들은 어떤 가게를 선호하는지 궁금하신가요? </p>
                <p className="lead"> 충남대 근처의 가게들로 구성된 맛집 월드컵을 통해 확인해보세요! </p>
                <div>
                    <a href="/AllCategory" className="btn btn-lg btn-secondary fw-bold border-white ">월드컵</a>
                    <a href="/AllMenu" className="btn btn-lg btn-secondary fw-bold border-white ">태그검색</a>
                    <a href="/AllCategory" className="btn btn-lg btn-secondary fw-bold border-white ">룰렛</a>
                    <a href="/AllCategory" className="btn btn-lg btn-secondary fw-bold border-white ">사다리</a>
                </div>
            </main>
        </div>
    );
}

export default HomePage;