import React from 'react';
import {Link} from "react-router-dom";
import {useEffect, useState} from 'react';
import axios from "axios";
import styles from "./HomePage.module.css"

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