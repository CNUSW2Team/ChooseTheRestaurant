import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Form, Table} from "react-bootstrap";
import {Link} from "react-router-dom";

function AllCategory() {
    const [category, setData] = useState([]);
    useEffect(() => {
            axios.get('/category/all')
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
        <Form>
            <h1>Store Table</h1>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>id</th>
                    <th>name</th>
                    <th>address</th>
                    <th>phone_number</th>
                    <th>opening_hours</th>
                </tr>
                </thead>
                <tbody>
                {store.map(v =>
                    <tr>
                        <td>{v.store_id}</td>
                        <td>{v.store_name}</td>
                        <td>{v.address}</td>
                        <td>{v.phone_number}</td>
                        <td>{v.opening_hours}</td>
                        <td><Link to={`/Store/${v.store_id}`}> 이동하기 </Link></td>
                    </tr>,
                )}
                </tbody>
            </Table>
        </Form>
    );
}

export default AllCategory;
