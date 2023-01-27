import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Form, Table} from "react-bootstrap";
import {Link, useNavigate } from "react-router-dom";
import {createFuzzyMatcher} from "../util/util";
import styles from "./table.module.css"

function AllStore() {
    const [store, setData] = useState([]);
    const [searchBox, setSearchBox] = useState('');
    const updateSearchBox = e => setSearchBox(e.target.value);
    const resetSearchBox = () => setSearchBox('');

    useEffect(() => {
        axios.get('/AllStore')
            .then(response => {
                setData(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    let navigate = useNavigate();

    function linkToStore(storeId) {
        navigate(`/Store/${storeId}`);
    }

    return (<Form>
        <div><input id={"searchArea"} value={searchBox} onChange={updateSearchBox}
                    placeholder={"Type 'Name' to Search"}/>
            <button type={"button"} onClick={resetSearchBox}>clear</button>
        </div>
        <Table className={styles.table}>
            <thead className={styles.thead}>
            <tr>
                <th className={styles.th}>사진</th>
                <th className={styles.th}>이름</th>
                <th className={styles.th}>주소</th>
                <th className={styles.th}>리뷰 개수</th>
            </tr>
            </thead>
            <tbody>
            {store.filter(v => createFuzzyMatcher(searchBox).test(v.store_name)).map(v => <tr onClick={()=>linkToStore(v.store_id)} style={{cursor:"pointer"}} key={v.store_id}>
                <td className={styles.td}><img width={100} src={`/img/${v.store_id}.jpg`}/></td>
                <td className={styles.td}>{v.store_name}</td>
                <td className={styles.td}>{v.address}</td>
                <td className={styles.td}>{v.numOfReviews}</td>
            </tr>,)}
            </tbody>
        </Table>
    </Form>);
}

export default AllStore;

