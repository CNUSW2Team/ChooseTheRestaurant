import React from 'react';
import {Checkbox} from 'antd';
import {Link} from "react-router-dom";

import {useEffect, useState} from 'react';
import axios from "axios";
import {Form, Table} from "react-bootstrap";
import styles from "./AddCategory.module.css"

function AddCategory() {
    const [store, setStore] = useState([]);
    const [select, setSelect] = useState([]);
    const updateCategoryName = e => setCategoryName(e.target.value);
    const [categoryName, setCategoryName] = useState('');

    function CreateCategory(){
        const fd = new FormData();

        const categoryDto = {
            category_name: categoryName, stores: select
        }
        fd.append("categoryDto", JSON.stringify(categoryDto));

        axios.post('http://localhost:8080/requestCategoryAdd', fd)
            .then((response) => {console.log(response.data)})
    }

    const onChangeAll = (e) => {
        // 체크할 시 CheckList에 id 값 전체 넣기, 체크 해제할 시 CheckList에 빈 배열 넣기
        setSelect(e.target.checked ? store.map(value => {
            return value.store_id
        }) : [])
    }

    const onChangeEach = (e, id) => {
        // 체크할 시 CheckList에 id값 넣기
        if (e.target.checked) {
            setSelect([...select, id]);
            // 체크 해제할 시 CheckList에서 해당 id값이 `아닌` 값만 배열에 넣기
        } else {
            setSelect(select.filter((checkedId) => checkedId !== id));
        }
    }

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


    return (
        <Form>
            <h1>월드컵 이름: <input onChange={updateCategoryName}/> </h1>
            <Form className={styles.left}>
                <h1>Selected Store Table</h1>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>name</th>
                        <th>address</th>
                    </tr>
                    </thead>
                    <tbody>
                    {store.filter(v =>  select.includes(v.store_id)).map(v =>
                        <tr>
                            <td>{v.store_name}</td>
                            <td>{v.address}</td>
                        </tr>,
                    )}
                    </tbody>
                </Table>
            </Form>
            <Form className={styles.right}>
                <h1>All Store Table</h1>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>
                            전체선택: <Checkbox onChange={onChangeAll} checked={select.length === store.length}/>
                        </th>
                    </tr>
                    <tr>
                        <th>선택</th>
                        <th>name</th>
                        <th>address</th>
                        <th>id</th>
                    </tr>
                    </thead>
                    <tbody>
                    {store.map(v =>
                        <tr>
                            <Checkbox onChange={(e) => onChangeEach(e, v.store_id)}
                                      checked={select.includes(v.store_id)}/>
                            <td>{v.store_name}</td>
                            <td>{v.address}</td>
                            <td>{v.store_id}</td>
                            {/*<td><Link to={`/Store/${v.store_id}`}> 이동하기 </Link></td>*/}
                        </tr>,
                    )}
                    </tbody>
                </Table>
            </Form>
            <button onClick={() => CreateCategory()}>등록하기</button>
        </Form>
    );
}

export default AddCategory;