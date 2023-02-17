import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Form, Table} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {createFuzzyMatcher} from "../../util/util";
import {Rating} from "@mui/material";
import Pagination from "react-js-pagination";
import PaginationBox from "../../util/PaginationBox";
import StartButton from "../StartButton";

function AllStore() {
    const [store, setStore] = useState([]);
    const [searchBox, setSearchBox] = useState('');

    // const [page, setPage] = useState(1);
    // const [items, setItems] = useState(4);
    // const [data, setData] = useState(store);
    // useEffect(() => {
    //     setTotalCount(data.length);
    //     setPage(1);
    // }, [data])
    // const [totalCount, setTotalCount] = useState(data.length - 1);
    // const handlePageChange = (page) => {
    //     setPage(page);
    // };

    const updateSearchBox = e => setSearchBox(e.target.value);
    // useEffect(() => {
    //     setData(store.filter(v => createFuzzyMatcher(searchBox).test(v.store_name.toLowerCase())));
    // }, [searchBox, store])

    useEffect(() => {
        axios.get('/api/Store')
            .then(response => {
                setStore(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    return (<div className="p-5">
        <h4 className="p-2"> 가게를 선택하세요</h4>
        <div>
            <div className="d-flex w-50 m-3">
                <input type="email" className="form-control w-75" id="searchArea" value={searchBox}
                       onChange={updateSearchBox}
                       placeholder="검색할 가게를 입력하세요."/>
                <button className="btn btn-outline-secondary" type="submit" onClick={() => setSearchBox('')}>초기화
                </button>
            </div>
            {/*<hr className="mt-5"/>*/}

            <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 row-cols-xxl-4 g-4 w-100 m-auto">
                {store.filter(v => createFuzzyMatcher(searchBox).test(v.store_name.toLowerCase())).map(v =>
                        <div className="col" onClick={() => window.location.href = `/Store/${v.store_id}`}>
                            <div className="card shadow">
                                <div className="row g-2">
                                    <div className="col">
                                        <img src={`/image/${v.store_id}`} className="rounded-start img-fluid h-100"
                                             style={{objectFit: "cover"}}/>
                                    </div>
                                    <div className="col">
                                        <div className="card-body d-flex flex-column justify-content-evenly h-100">
                                            <h5 className="card-title fw-bold text-truncate w-100">{v.store_name}</h5>
                                            <p className="card-text mb-5">{v.address}</p>
                                            <p className="card-text text-end">
                                                <small className="d-inline-flex">
                                                    <Rating name="Average_Star" value={v.averageStars} precision={0.5}
                                                            readOnly/> {v.averageStars}
                                                </small>
                                            </p>
                                            <p className="card-text text-end">
                                                <small className="text-muted">
                                                    {v.numOfReviews}개의 리뷰
                                                </small>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ,)}

                {/*<table className="table table-hover w-75 text-center align-middle">*/}
                {/*    <thead>*/}
                {/*    <tr>*/}
                {/*        <th>사진</th>*/}
                {/*        <th>이름</th>*/}
                {/*        <th>주소</th>*/}
                {/*        <th>리뷰 개수</th>*/}
                {/*        <th>평균 별점</th>*/}
                {/*    </tr>*/}
                {/*    </thead>*/}
                {/*    <tbody>*/}
                {/*    {data && totalCount === 0 ?*/}
                {/*        <tr>*/}
                {/*            <td colSpan={5}> 검색된 데이터가 없습니다.</td>*/}
                {/*        </tr>*/}
                {/*        : data.slice(items * (page - 1), items * (page - 1) + items)*/}
                {/*            .map(v => <tr key={v.store_id} onClick={() => window.location.href = `/Store/${v.store_id}`}>*/}
                {/*                <td><img width={100} src={`/image/${v.store_id}`}/></td>*/}
                {/*                <td>*/}
                {/*                    {v.store_name}*/}
                {/*                </td>*/}
                {/*                <td>{v.address}</td>*/}
                {/*                <td>{v.numOfReviews}</td>*/}
                {/*                <td>*/}
                {/*                    <div>*/}
                {/*                        <Rating name="Average_Star" value={v.averageStars} precision={0.5}*/}
                {/*                                readOnly/> {v.averageStars}*/}
                {/*                    </div>*/}
                {/*                </td>*/}
                {/*            </tr>,)}*/}
                {/*    </tbody>*/}
                {/*</table>*/}
            </div>
            {/*<PaginationBox>*/}
            {/*    <Pagination*/}
            {/*        activePage={page}*/}
            {/*        itemsCountPerPage={items}*/}
            {/*        totalItemsCount={totalCount}*/}
            {/*        pageRangeDisplayed={5}*/}
            {/*        onChange={handlePageChange}>*/}
            {/*    </Pagination>*/}
            {/*</PaginationBox>*/}
        </div>
    </div>);
}

export default AllStore;

