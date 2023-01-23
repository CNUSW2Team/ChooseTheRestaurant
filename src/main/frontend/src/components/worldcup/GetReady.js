import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Form, Table} from "react-bootstrap";
import {Link, useParams} from "react-router-dom";

function GetReady() {
    let { categoryId } = useParams();

    const [category, setData] = useState([]); 
    useEffect(() => {
            axios.get(`/AllCategory/${categoryId}`)
                .then(response => {
                    setData(response.data);
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                })
            console.log("마운팅")
        },
        []);

        
    const [numOfRound, SetRound] = useState()

    const sendRound = (e) => {
        // console.log(e.target.value)
        SetRound(e.target.value)
        // console.log(typeof(numOfRound)) //console에 한 박자 늦게 찍히는 이유
    }
    
    const DneyUndefined = e => {
        console.log(e)
        if(typeof(numOfRound) == 'undefined'){
            e.preventDefault();
            alert('라운드를 선택해주세요')
        }
    }


    return (
        <div>
            <h1>{category && category["category_name"]}</h1>
            <div>
                <button value={2} onClick={sendRound}>Round : 2강</button>
                <button value={4} onClick={sendRound}>Round : 4강</button>
            </div>
            {/* <Link to={`/Round/${categoryId}/${numOfRound}`}><button onClick={DneyUndefined}>시작하기</button></Link> */}
            <Link to={`/Round/${categoryId}/${numOfRound}/test`}><button onClick={DneyUndefined}>시작하기</button></Link>
        </div>
        
    );
}

export default GetReady;
