import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Form, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import styles from "../table.module.css"

function ModifyEntities() {
    const [category, setCategory] = useState([]);
    const [store, setStore] = useState([]);
    useEffect(() => {
            axios.get('/AllCategory')
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
            axios.get('/AllStore')
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
        const fd = new FormData();
        const categoryDto = {
            category_id: category_id
        }
        if (window.confirm("정말로 삭제하시겠습니까?")) {

            fd.append("categoryDto", JSON.stringify(categoryDto));

            axios.post('http://localhost:8080/requestCategoryRemove', fd)
                .then(() => {
                    window.location.href = "/admin/ModifyEntities";
                })
                .then((response) => {
                    console.log(response.data)
                })
        }
    }

    function RemoveStore(store_id) {
        const fd = new FormData();
        const storeDto = {
            store_id: store_id
        }
        if (window.confirm("정말로 삭제하시겠습니까?\n관련된 메뉴, 코멘트, 리뷰가 모두 삭제되며,\n카테고리에 등록된 가게 또한 삭제됩니다.\n해당 작업은 되돌릴 수 없습니다.")) {

            fd.append("storeDto", JSON.stringify(storeDto));

            axios.post('http://localhost:8080/requestStoreRemove', fd)
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
            <Form className={styles.left}>
                <h1> 카테고리 리스트 </h1>
                <Table className={styles.table}>
                    <thead className={styles.thead}>
                    <tr>
                        <th className={styles.th}>월드컵</th>
                        <th className={styles.th}>좋아요</th>
                        <th className={styles.th}>가게 수</th>
                        <th className={styles.th}>삭제하기</th>
                    </tr>
                    </thead>
                    <tbody className={styles.body}>
                    {category.map(v =>
                        <tr key={v.category_id}>
                            <td className={styles.td}><img width={300} src={`/image/${v.category_id}`}/><br></br>
                                {v.category_name}</td>
                            <td className={styles.td}>{v.favorite}</td>
                            <td className={styles.td}>{v.num_of_stores}개</td>
                            <td className={styles.td}>
                                <button onClick={() => RemoveCategory(v.category_id)}>삭제하기</button>
                            </td>
                        </tr>,
                    )}
                    </tbody>
                </Table>
            </Form>
            <Form className={styles.right}>
                <h1> 가게 리스트 </h1>
                <Table className={styles.table}>
                    <thead className={styles.thead}>
                    <tr>
                        <th className={styles.th}>가게</th>
                        <th className={styles.th}>주소</th>
                        <th className={styles.th}>삭제하기</th>
                    </tr>
                    </thead>
                    <tbody>
                    {store.map(v =>
                        <tr key={v.store_id}>
                            <td className={styles.td}><img width={100} src={`/image/${v.store_id}`}/><br></br>
                                {v.store_name}</td>
                            <td className={styles.td}>{v.address}</td>
                            <td className={styles.td}>
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
