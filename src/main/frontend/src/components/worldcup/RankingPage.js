import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import RankingTable from "./RankingTable";
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
            <h5 className="mb-4 d-flex">
                <div className="text-info me-2">{category && category.category_name}</div>
                순위
            </h5>
            <div className="row row-cols-1 row-cols-xl-2">
                <div className="col">
                    {/*<h4 className="mb-4 border-bottom w-100 text-center p-4"> Top3! </h4>*/}
                    <Top3 store={store}/>
                </div>
                <div className="col">
                    {/*<h4 className="m-4 border-bottom w-100 text-center p-4"> 전체결과 </h4>*/}
                    <RankingTable category={categoryId} setStore={setStore}/>
                </div>
            </div>
        </div>
    );
}

export default RankingPage;

