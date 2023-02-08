import React from 'react';
import {Link} from "react-router-dom";

function HomePage() {
    return (
        <div className="w-50 h-100 p-3 mx-auto">
            <main className="position-absolute top-50 start-50 translate-middle text-center">
                <h1>Start page.</h1>
                <p className="lead">Cover is a one-page template for building simple and beautiful home pages. Download,
                    edit the text, and add your own fullscreen background photo to make it your own.</p>
                <p className="lead">
                    <a href="/AllCategory" className="btn btn-lg btn-secondary fw-bold border-white ">충대맛집월드컵 시작하기</a>
                </p>
            </main>
        </div>
    );
}

export default HomePage;