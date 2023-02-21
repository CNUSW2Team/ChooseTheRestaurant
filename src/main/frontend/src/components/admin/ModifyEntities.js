import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Form, Table} from "react-bootstrap";
import {Link} from "react-router-dom";

function ModifyEntities() {
    const [category, setCategory] = useState([]);
    const [store, setStore] = useState([]);
    useEffect(() => {
            axios.get('/api/Category')
                .then(response => {
                    setCategory(response.data);
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                })
        },
        []);
    useEffect(() => {
            axios.get('/api/Store')
                .then(response => {
                    setStore(response.data);
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                })
        },
        []);

    function RemoveCategory(category_id) {
        if (window.confirm("정말로 삭제하시겠습니까?")) {
            axios.delete(`/api/Category/${category_id}`)
                .then(() => {
                    window.location.href = "/admin/ModifyEntities";
                })
                .then((response) => {
                    console.log(response.data)
                })
        }
    }

    function RemoveStore(store_id) {
        if (window.confirm("정말로 삭제하시겠습니까?\n관련된 메뉴, 코멘트, 리뷰가 모두 삭제되며,\n카테고리에 등록된 가게 또한 삭제됩니다.\n해당 작업은 되돌릴 수 없습니다.")) {
            axios.delete(`/api/Store/${store_id}`)
                .then(() => {
                    window.location.href = "/admin/ModifyEntities";
                })
                .then((response) => {
                    console.log(response.data)
                })
        }
    }

    return (
        <div>
            <Form className="left">
                <h1> 카테고리 리스트 </h1>
                <Table className="table">
                    <thead className="thead">
                    <tr>
                        <th className="th">월드컵</th>
                        <th className="th">좋아요</th>
                        <th className="th">가게 수</th>
                        <th className="th">삭제하기</th>
                    </tr>
                    </thead>
                    <tbody className="body">
                    {category.map(v =>
                        <tr key={v.category_id}>
                            <td className="td"><img width={300} src={`/image/${v.category_id}`}/><br></br>
                                {v.category_name}</td>
                            <td className="td">{v.favorite}</td>
                            <td className="td">{v.num_of_stores}개</td>
                            <td className="td">
                                <button onClick={() => RemoveCategory(v.category_id)}>삭제하기</button>
                            </td>
                        </tr>,
                    )}
                    </tbody>
                </Table>
            </Form>
            <Form className="right">
                <h1> 가게 리스트 </h1>
                <Table className="table">
                    <thead className="thead">
                    <tr>
                        <th className="th">가게</th>
                        <th className="th">주소</th>
                        <th className="th">삭제하기</th>
                    </tr>
                    </thead>
                    <tbody>
                    {store.map(v =>
                        <tr key={v.store_id}>
                            <td className="td"><img width={100} src={`/image/${v.store_id}`}/><br></br>
                                {v.store_name}</td>
                            <td className="td">{v.address}</td>
                            <td className="td">
                                <button onClick={() => RemoveStore(v.store_id)}>삭제하기</button>
                            </td>
                        </tr>,
                    )}
                    </tbody>
                </Table>
            </Form>
        </div>
    );
}


export default ModifyEntities;
