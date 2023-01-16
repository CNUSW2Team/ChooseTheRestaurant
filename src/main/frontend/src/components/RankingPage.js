import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Form, Table} from "react-bootstrap";
import {Link, useParams} from "react-router-dom";

function RankingPage() {
    const [store, setStore] = useState([]);
    const [category, setCategory] = useState([]);
    let { categoryId } = useParams();

    useEffect(() => {
            axios.get(`/Ranking/${categoryId}`)
                .then(response => {
                    setStore(response.data);
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                })
        },
        []);
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

    let count = 1;
    return (
        <Form>
            <h1><p>{category && category.category_name} 월드컵 순위</p></h1>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>순위</th>
                    <th>사진</th>
                    <th>이름</th>
                    <th>별점</th>
                    <th>승리</th>
                    <th>상세정보</th>
                </tr>
                </thead>
                <tbody>
                {store.map(v =>
                    <tr>
                        <td>{count++}</td>
                        <td><img width={100} src={`/img/${v.store_id}.jpg`} /></td>
                        <td>{v.store_name}</td>
                        <td>{v.stars}</td>
                        <td>{v.winningCount}</td>
                        <td><Link to={`/Store/${v.store_id}`}> 상세정보 </Link></td>
                    </tr>,
                )}
                </tbody>
            </Table>
        </Form>
    );
}

export default RankingPage;

