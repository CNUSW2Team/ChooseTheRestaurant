import React from 'react';
import {Checkbox} from 'antd';
import {Link, useHref} from "react-router-dom";
import styled from "styled-components";
import {useEffect, useState} from 'react';
import axios from "axios";
import {Form, Table} from "react-bootstrap";
import styles from "./AddCategory.module.css"
import {createFuzzyMatcher} from "../util/util";


function AddCategory() {
    const [store, setStore] = useState([]);
    const [select, setSelect] = useState([]);

    const [categoryName, setCategoryName] = useState('');
    const updateCategoryName = e => setCategoryName(e.target.value);

    const [searchBox, setSearchBox] = useState('');
    const updateSearchBox = e => setSearchBox(e.target.value);
    const resetSearchBox = () => setSearchBox('');

    function CreateCategory() {
        const fd = new FormData();

        if (categoryName.length < 5) {
            alert('월드컵 이름은 5자 이상으로 해 주세요.');
        }
        else if(select.length < 2){
            alert('가게를 2개 이상 선택해 주세요.');
        }
        else {
            const categoryDto = {
                category_name: categoryName, stores: select
            }
            fd.append("categoryDto", JSON.stringify(categoryDto));

            axios.post('http://localhost:8080/requestCategoryAdd', fd)
                .then(() => {
                    window.location.href = "/AllCategory";
                })
                .then((response) => {
                    console.log(response.data)
                })
        }
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
        <div>
            <h1>월드컵 이름: <input onChange={updateCategoryName}/>
                <button type={"button"} onClick={() => CreateCategory()}>등록하기</button>
            </h1>
            <div className={styles.left}>
                <h1>Selected Store Table</h1>
                <Table>
                    <thead>
                    <tr>
                        <th>선택 해제</th>
                        <th>이름</th>
                        <th>주소</th>
                        <th>상세정보</th>
                    </tr>
                    </thead>
                    <tbody>
                    {store.filter(v => select.includes(v.store_id)).map(v =>
                        <tr key={v.store_id}>
                            <td><Checkbox onChange={(e) => onChangeEach(e, v.store_id)}
                                          checked={select.includes(v.store_id)}/></td>
                            <td><img width={100} src={`/img/${v.store_id}.jpg`}/><br></br>{v.store_name}</td>
                            <td>{v.address}</td>
                            <td><Link to={`/Store/${v.store_id}`}> 상세정보 </Link></td>
                        </tr>,
                    )}
                    </tbody>
                </Table>
            </div>
            <div className={styles.right}>
                <h1>All Store Table</h1>
                <div><input id={"searchArea"} value={searchBox} onChange={updateSearchBox}
                            placeholder={"Type 'Name' to Search"}/>
                    <button type={"button"} onClick={resetSearchBox}>clear</button>
                </div>
                <Table>
                    <thead>
                    <tr>
                        <th>
                            전체선택: <Checkbox onChange={onChangeAll} checked={select.length === store.length}/>
                        </th>
                    </tr>
                    <tr>
                        <th>선택</th>
                        <th>이름</th>
                        <th>주소</th>
                        <th>상세정보</th>
                    </tr>
                    </thead>
                    <tbody>
                    {store.filter(v => createFuzzyMatcher(searchBox).test(v.store_name)).filter(v => !select.includes(v.store_id)).map(v =>
                        <tr key={v.store_id}>
                            <td><Checkbox onChange={(e) => onChangeEach(e, v.store_id)}
                                          checked={select.includes(v.store_id)}/></td>
                            <td><img width={100} src={`/img/${v.store_id}.jpg`}/><br></br>{v.store_name}</td>
                            <td>{v.address}</td>
                            {/*<td>{v.store_id}</td>*/}
                            <td><Link to={`/Store/${v.store_id}`}> 상세정보 </Link></td>
                        </tr>,
                    )}
                    </tbody>
                </Table>
            </div>
        </div>

    );
}

export default AddCategory;