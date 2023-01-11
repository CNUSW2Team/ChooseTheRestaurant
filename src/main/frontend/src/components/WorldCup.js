import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Form, Table} from "react-bootstrap";
import {Link, useParams} from "react-router-dom";

function WorldCup() {
    // 라운드 선택 >> 사진, 가게이름
    let { worldcupId } = useParams();

    const [category, setData] = useState([]); //나중에 카테고리 name, 사진,  DB받기
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
    

        
    let dataShowUp = () => {

    }

    return (
        // 팝업 & 월드컵 데이터 같이 받기
        <div>
            <Link to={`/Ranking/${worldcupId}`}> <button onClick={console.log(2)}>Round : 2강</button> </Link>

            <button onClick={dataShowUp}>Round : 4강</button>
            {worldcupId}
            {/*<Link to={}*/}
            {/* 라운드 선택 >> 시작하기 클릭 시 random 개수 만큼 뜨게하기 */}
            {/* <img width={500} src={`/img/${category[0] && category[0]["worldcup_id"]}.jpg`} />
            <p>{category[0] && category[0]["worldcup_name"]}</p> */}
        </div>
        
    );
}

export default WorldCup;