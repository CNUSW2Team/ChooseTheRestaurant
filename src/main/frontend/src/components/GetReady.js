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
        },
        []);

        
    const [numOfRound, SetRound] = useState('')
    const sendRound = (e) => {
        SetRound(e.target.value)
        console.log(numOfRound)
    }
    
    return (
        <div>
            <h1>{category && category["category_name"]}</h1>
            <div>
                <button value={2} onClick={sendRound}>Round : 2강</button>
                <button value={4} onClick={sendRound}>Round : 4강</button>
            </div>
            <Link to={`/Round/${categoryId}/${numOfRound}`}><button>시작하기</button></Link>
        </div>
        
    );
}

export default GetReady;
