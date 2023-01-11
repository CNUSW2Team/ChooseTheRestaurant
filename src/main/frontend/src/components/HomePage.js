import React from 'react';
import {Link} from "react-router-dom";

import {useEffect, useState} from 'react';
import axios from "axios";

function HomePage(props) {
    const [category, setData] = useState([]);
    useEffect(() => {
            axios.get('/category/all')
                .then(response => {
                    setData(response.data);
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                })
        },
        []);
    return (
        <>  
            <Link to="/AllCategory">
                <p>충대맛집월드컵 시작하기</p>
            </Link> 
            <Link to="/Ranking/:worldcupId">랭킹페이지</Link>
        </>
      
    );
}

export default HomePage;