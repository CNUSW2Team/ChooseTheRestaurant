import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Form, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import {createFuzzyMatcher} from "../util/util";

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
    return (<Form>
        <h1>Store Table</h1>
        <div><input id={"searchArea"} value={searchBox} onChange={updateSearchBox}
                    placeholder={"Type 'Name' to Search"}/>
            <button type={"button"} onClick={resetSearchBox}>clear</button>
        </div>
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>id</th>
                <th>name</th>
                <th>address</th>
            </tr>
            </thead>
            <tbody>
            {store.filter(v => createFuzzyMatcher(searchBox).test(v.store_name)).map(v => <tr>
                <td><img width={100} src={`/img/${v.store_id}.jpg`}/></td>
                <td>{v.store_name}</td>
                <td>{v.address}</td>
                <td><Link to={`/Store/${v.store_id}`}> 상세정보 </Link></td>
            </tr>,)}
            </tbody>
        </Table>
    </Form>);
}

export default AllStore;

