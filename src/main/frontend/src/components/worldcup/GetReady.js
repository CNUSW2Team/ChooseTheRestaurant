import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useParams} from "react-router-dom";

function GetReady() {
    let { categoryId } = useParams();

    const [category, setData] = useState([]); 
    useEffect(() => {
            axios.get(`/Category/${categoryId}`)
                .then(response => {
                    setData(response.data);
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                })
        },
        []);

    const [numOfRound, setRound] = useState()

    const sendRound = (e) => {
        setRound(e.target.value)
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
                <button value={8} onClick={sendRound}>Round : 8강</button>
            </div>
            <Link to={`/Round/${categoryId}/${numOfRound}`}><button onClick={DneyUndefined}>시작하기</button></Link>
            <Link to={`/Ranking/${categoryId}`}><button>랭킹페이지</button></Link>
        </div>
        
    );
}

export default GetReady;
