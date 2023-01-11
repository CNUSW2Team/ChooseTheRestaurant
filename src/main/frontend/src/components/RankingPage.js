import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Form, Table} from "react-bootstrap";
import {Link, useParams} from "react-router-dom";

function RankingPage() {
    const [store, setStore] = useState([]);
    const [worldcup, setWorldcup] = useState([]);
    const [reviews, setReview] = useState([]);
    const [relations, setRelation] = useState([]);
    let { worldcupId } = useParams();

    useEffect(() => {
            axios.get('/store/all')
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
            axios.get(`/category/${worldcupId}`)
                .then(response => {
                    setWorldcup(response.data);
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                })
        },
        []);
    useEffect(() => {
            axios.get(`/review/all`)
                .then(response => {
                    setReview(response.data);
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                })
        },
        []);
    useEffect(() => {
            axios.get(`/relation`)
                .then(response => {
                    setRelation(response.data);
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                })
        },
        []);

    return (
        <Form>
            <h1><p>{worldcup && worldcup.worldcup_name} 월드컵 순위</p></h1>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>사진</th>
                    <th>이름</th>
                    <th>별점</th>
                    <th>리뷰</th>
                    <th>승리</th>
                </tr>
                </thead>
                <tbody>
                {store.map(v =>
                    <tr>
                        <td><img width={100} src={`/img/${v.store_id}.jpg`} /></td>
                        <td>{v.store_name}</td>
                        <td>{reviews.filter(review => review.store_id === v.store_id).length === 0 ? 0 : reviews.filter(review => review.store_id === v.store_id)
                            .map(w => w.rating)
                            .reduce((sum, cur) => sum += cur, 0) / reviews.filter(review => review.store_id === v.store_id).length}</td>
                        <td>{reviews.filter(review => review.store_id === v.store_id).length}</td>
                        <td>{relations.filter(relation => relation.worldcup_id === worldcupId).filter(relation => relation.store_id === v.store_id).map(w => w.win_count)}</td>
                        <td><Link to={`/Store/${v.store_id}`}> 상세정보 </Link></td>
                    </tr>,
                )}
                </tbody>
            </Table>
        </Form>
    );
}

export default RankingPage;

