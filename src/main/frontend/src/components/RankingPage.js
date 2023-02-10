/*global kakao*/
import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Form, Table} from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import RankingTable from "./worldcup/RankingTable";
import Top3 from "./Top3";

function RankingPage() {
    const [store, setStore] = useState([]);

    const [category, setCategory] = useState([]);
    let {categoryId} = useParams();

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

    return (
        <div className="p-4">
            <h5>{category && category.category_name} 월드컵 순위</h5>
            <div className="d-flex">
                <Top3 store={store}/>
                <RankingTable category={categoryId} setStore={setStore}/>
            </div>
        </div>
    );
}

export default RankingPage;

