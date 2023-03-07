import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {adminBtn, adminGet} from "./auth/AdminUtil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAtom, faTags, faTrophy } from "@fortawesome/free-solid-svg-icons";
import { ReactComponent as MainLogo } from '../MainLogo.svg';

function HomePage() {


    return (
        <div className='min-vh-100'>
            <main className="position-absolute top-50 start-50 translate-middle text-center">
                <MainLogo width={"55vw"} />
                <div>
                    <a href="/AllCategory" className="btn btn-lg btn-secondary fw-bold border-white ">
                        월드컵<FontAwesomeIcon icon={faTrophy} style={{size:"2x", marginLeft: "3px"}} />
                    </a>
                    <a href="/AllMenu" className="btn btn-lg btn-secondary fw-bold border-white ">
                        태그<FontAwesomeIcon icon={faTags} style={{size:"2x", marginLeft: "3px"}} />
                    </a>
                    <a href="/Roulette" className="btn btn-lg btn-secondary fw-bold border-white ">
                        룰렛<FontAwesomeIcon icon={faAtom} style={{size:"2x", marginLeft: "3px"}} />
                    </a>
                    <a href="/AllCategory" className="btn btn-lg btn-secondary fw-bold border-white ">
                        사다리<FontAwesomeIcon icon={faTrophy} style={{size:"2x", marginLeft: "3px"}} />
                    </a>
                </div>
            </main>
        </div>
    );
}

export default HomePage;