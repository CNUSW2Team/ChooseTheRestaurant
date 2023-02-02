/*global kakao*/
import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Form, Table} from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import styles from "./RankingPage.module.css"
import KakaoMap from "./kakao/KakaoMap";
import RankingTable from "./worldcup/RankingTable";

function RankingPage() {
    const [store, setStore] = useState([]);

    const [category, setCategory] = useState([]);
    let { categoryId } = useParams();

    // useEffect(() => {
    //         axios.get(`/Ranking/${categoryId}`)
    //             .then(response => {
    //                 setStore(response.data);
    //                 console.log(response.data);
    //             })
    //             .catch(error => {
    //                 console.log(error);
    //             })
    //     },
    //     []);
    useEffect(() => {

            axios.get(`/AllCategory/${categoryId}`)
                .then(response => {
                    setCategory(response.data);
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                })
        },
        []);


    let rankingCount = 0;

    return (
        <div className="wrapper">
            <div className="main">
                <h1><p>{category && category.category_name} 월드컵 순위</p></h1>
                <div style={{display:"flex"}}>
                        <div>
                            <div className={styles.top3}>
                                {store[1] && <img src={`/image/${store[1].store_id}`}/>}
                                {store[0] && <img src={`/image/${store[0].store_id}`}/>}
                                {store[2] && <img src={`/image/${store[2].store_id}`}/>}
                            </div>
                        </div>
                        <RankingTable category={categoryId} setStore={setStore}/>
                    </div>
            </div>



        </div>

    );
}

export default RankingPage;

