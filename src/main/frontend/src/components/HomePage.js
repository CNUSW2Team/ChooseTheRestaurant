import React from 'react';
import {Link} from "react-router-dom";

function HomePage() {
    return (
        <div className="">
            <main className="position-absolute top-50 start-50 translate-middle text-center">
                <h1 className="mb-5">소개 페이지</h1>
                <p className="lead"> 오늘 무엇을 먹을지 고민중이신가요? </p>
                <p className="lead"> 다른 사람들은 어떤 가게를 선호하는지 궁금하신가요? </p>
                <p className="lead"> 충남대 근처의 가게들로 구성된 맛집 월드컵을 통해 확인해보세요! </p>
                <p className="lead">
                    <a href="/AllCategory" className="btn btn-lg btn-secondary fw-bold border-white ">충대맛집월드컵 시작하기</a>
                </p>
            </main>
        </div>
    );
}

export default HomePage;