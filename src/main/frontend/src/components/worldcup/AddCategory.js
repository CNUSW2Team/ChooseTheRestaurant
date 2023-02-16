import React from 'react';
import {Checkbox} from 'antd';
import {Link, useHref} from "react-router-dom";

import {useEffect, useState} from 'react';
import axios from "axios";
import {Form, Table} from "react-bootstrap";
import {createFuzzyMatcher} from "../../util/util";


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
        } else if (select.length < 2) {
            alert('가게를 2개 이상 선택해 주세요.');
        } else {
            const categoryDto = {
                category_name: categoryName, stores: select
            }
            fd.append("categoryDto", JSON.stringify(categoryDto));

            axios.post('/api/Category', fd)
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

    // const onChangeEach = (e, id) => {
    //     // 체크할 시 CheckList에 id값 넣기
    //     if (e.target.checked) {
    //         setSelect([...select, id]);
    //         // 체크 해제할 시 CheckList에서 해당 id값이 `아닌` 값만 배열에 넣기
    //     } else {
    //         setSelect(select.filter((checkedId) => checkedId !== id));
    //     }
    // }

    const addCheckList = (e, id) => {
        setSelect([...select, id]);
    }

    const removeCheckList = (e, id) => {
        setSelect(select.filter((checkedId) => checkedId !== id));
    }

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

    return (
        <div className="m-5">
            <h4 className="mb-5 p-2">월드컵 만들기</h4>
            <div className="d-flex justify-content-center m-3">
                <h5 className="me-3">월드컵 이름: </h5>
                <input className="form-control w-50" onChange={updateCategoryName}/>
                <button className="btn btn-outline-secondary" type={"button"} onClick={() => CreateCategory()}>등록하기
                </button>
            </div>
            <div className="d-flex">
                <div className="w-50 p-5">

                    <div className="d-flex m-3 align-items-center">
                        <h5>전체 가게 목록</h5>
                        <input type="email" className="form-control w-50 ms-4" id="searchArea" value={searchBox}
                               onChange={updateSearchBox}
                               placeholder="검색할 가게를 입력하세요."/>
                        <button className="btn btn-outline-secondary me-5" type="submit" onClick={() => setSearchBox('')}>
                            초기화
                        </button>
                        <div className="d-flex align-items-center">
                            전체선택: <Checkbox className="ms-2" onChange={onChangeAll} checked={select.length === store.length}/>
                        </div>
                    </div>
                    <table className="table table-hover text-center align-middle">
                        <thead className="thead">
                        <tr>
                            <th className="th" width={100}>이름</th>
                            <th className="th">주소</th>
                            <th className="th" width={80}>상세정보</th>
                        </tr>
                        </thead>
                        <tbody className="body">
                        {store.filter(v => createFuzzyMatcher(searchBox).test(v.store_name)).filter(v => !select.includes(v.store_id)).map(v =>
                            <tr key={v.store_id} onClick={(e) => addCheckList(e, v.store_id)}>
                                <td className="td"><img width={100}
                                                        src={`/image/${v.store_id}`}/><br></br>{v.store_name}
                                </td>
                                <td className="td">{v.address}</td>
                                {/*<td>{v.store_id}</td>*/}
                                <td className="td"><Link to={`/Store/${v.store_id}`}> 상세정보 </Link></td>
                            </tr>,
                        )}
                        </tbody>
                    </table>
                </div>
                <div className="w-50 p-5">
                    <h5 className="">선택된 가게</h5>
                    <table className="table table-hover text-center align-middle">
                        <thead className="thead">
                        <tr>
                            <th className="th" width={100}>이름</th>
                            <th className="th">주소</th>
                            <th className="th" width={80}>상세정보</th>
                        </tr>
                        </thead>
                        <tbody className="body">
                        {store.filter(v => select.includes(v.store_id)).map(v =>
                            <tr key={v.store_id} onClick={(e) => removeCheckList(e, v.store_id)}>
                                <td className="td"><img width={100}
                                                        src={`/image/${v.store_id}`}/><br></br>{v.store_name}
                                </td>
                                <td className="td">{v.address}</td>
                                <td className="td"><Link to={`/Store/${v.store_id}`}> 상세정보 </Link></td>
                            </tr>,
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AddCategory;