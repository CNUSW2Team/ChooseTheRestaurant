/*global kakao*/
import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Form, Table} from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import styles from "./table.module.css";
import "./RankingPage.css"

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
    let rankingCount = 0;

    return (
        <div>
            <h1><p>{category && category.category_name} 월드컵 순위</p></h1>
            <Form className={styles.left}>
                <div id={"top3"}>
                    {store[0] && <img id={"firstPlace"} src={`/image/${store[0].store_id}`}/>}
                    {store[1] && <img id={"secondPlace"} src={`/image/${store[1].store_id}`}/>}
                    {store[2] && <img id={"thirdPlace"} src={`/image/${store[2].store_id}`}/>}
                </div>
            </Form>
            <Form className={styles.right}>
                <Table striped bordered hover className={styles.table}>
                    <thead>
                    <tr>
                        <th className={styles.thead}>순위</th>
                        <th className={styles.thead}>사진</th>
                        <th className={styles.thead}>이름</th>
                        <th className={styles.thead}>별점</th>
                        <th className={styles.thead}>승리</th>
                        <th className={styles.thead}>상세정보</th>
                    </tr>
                    </thead>
                    <tbody className={styles.body}>

                    {store.map(v =>
                        <tr key={v.store_id}>
                            <td className={styles.td}>{count++}</td>
                            <td className={styles.td}><img width={100} src={`/image/${v.store_id}`} /></td>

                            <td className={styles.td}>{v.store_name}</td>
                            <td className={styles.td}>{v.stars}</td>
                            <td className={styles.td}>{v.winningCount}</td>
                            <td className={styles.td}><Link to={`/Store/${v.store_id}`}> 상세정보 </Link></td>
                        </tr>,
                    )}
                    </tbody>
                </Table>
            </Form>
        </div>

    );
}

export default RankingPage;

