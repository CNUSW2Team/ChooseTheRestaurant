import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {Table} from "react-bootstrap";

function Store() {
    let {storeId} = useParams();

    const [store, setData] = useState([]);
    useEffect(() => {
            axios.get(`/StoreInfo/${storeId}`)
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
        <div>
            <p> 가게이름: {store.store_name} </p>
            <img width={100} src={`/img/${storeId}.jpg`}/>

            <p> 주소: {store.address} </p>
            <p> 연락처: {store.contact} </p>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>메뉴명</th>
                    <th>가격</th>
                </tr>
                </thead>
                <tbody>
                {store.menu && store.menu.map(v =>
                    <tr>
                        <td>{v.menu_name}</td>
                        <td>{v.price}</td>
                    </tr>,
                )}
                </tbody>
            </Table>

            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>작성자</th>
                    <th>시간</th>
                    <th>별점</th>
                    <th>내용</th>
                </tr>
                </thead>
                <tbody>
                {store.reviews && store.reviews.map(v =>
                    <tr>
                        <td>{v.nickname}</td>
                        <td>{v.date}</td>
                        <td>{v.stars}</td>
                        <td>{v.comment}</td>
                    </tr>,
                )}
                </tbody>
            </Table>

            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>요일</th>
                    <th>시간</th>
                </tr>
                </thead>
                <tbody>
                {store.times && store.times.map(v =>
                    <tr>
                        <td>{v.day}</td>
                        <td>{v.hours}</td>
                    </tr>,
                )}
                </tbody>
            </Table>


        </div>

    );
}

export default Store;