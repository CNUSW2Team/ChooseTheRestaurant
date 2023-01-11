import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Form, Table} from "react-bootstrap";
import {Link, useParams} from "react-router-dom";

function WorldCup(props) {
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
        <div>
            <h2>월드컵 N강</h2>
            {/* 라운드 선택 >> 시작하기 클릭 시 random 개수 만큼 뜨게하기 */}
            {/* <img width={500} src={`/img/${category[0] && category[0]["worldcup_id"]}.jpg`} />
            <p>{category[0] && category[0]["worldcup_name"]}</p> */}
        </div>
    );
}

export default WorldCup;