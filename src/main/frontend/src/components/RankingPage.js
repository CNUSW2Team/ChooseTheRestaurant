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
            axios.get(`/api/Category/${categoryId}`)
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
            <h5 className="mb-4">[{category && category.category_name}] 순위</h5>
            <div className="d-flex flex-column align-items-center">
                <h4 className="mb-4 border-bottom w-100 text-center p-4"> Top3! </h4>
                <Top3 store={store}/>
                <h4 className="m-4 border-bottom w-100 text-center p-4"> 전체결과 </h4>
                <RankingTable category={categoryId} setStore={setStore}/>
            </div>
        </div>
    );
}

export default RankingPage;

