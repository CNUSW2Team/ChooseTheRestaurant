import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Form, Table} from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import WorldCup from './WorldCup';

function RoundChoice() {
    // 라운드 선택 >> 사진, 가게이름
    let { worldcupId } = useParams();

    const [category, setData] = useState([]); //나중에 카테고리 name, 사진,  DB받기
    useEffect(() => {
            axios.get(`/category/${worldcupId}`)
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
        // 팝업 & 월드컵 데이터 같이 받기
        <div>
            <Link to={`/RoundChoice/${worldcupId}/WorldCup`} state={{ rounds: 2 }}><button>Round : 2강</button></Link>
            <Link to={`/RoundChoice/${worldcupId}/WorldCup`} state={{ rounds: 4 }}><button>Round : 4강</button></Link>
            <Link to={`/Ranking/${worldcupId}`}><button>랭킹페이지로 가기</button></Link> 
        </div>
        
    );
}

export default RoundChoice;