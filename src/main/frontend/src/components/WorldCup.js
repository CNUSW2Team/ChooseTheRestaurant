import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Form, Table} from "react-bootstrap";
import {Link, useParams, useLocation} from "react-router-dom";



function WorldCup(props) {
    let { categoryId } = useParams();
    let { numOfRound } = useParams();

    const [StoreInfo, setData] = useState([]);
    useEffect(() => {
            axios.get(`/Round/${categoryId}/${numOfRound}`)
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
            <h2>{numOfRound}강</h2>
            {/* 랜덤월드컵 구현 */}
            <Link to={`/Result/${categoryId}/${StoreInfo[0] && StoreInfo[0]["store_id"]}`}>
                <div>
                    <p>{StoreInfo[0] && StoreInfo[0]["name"]}</p>
                    <img width={500} src={`/img/${StoreInfo[0] && StoreInfo[0]["store_id"]}.jpg`} />
                </div>
            </Link>
            
        
        </div>
    );
}

export default WorldCup;