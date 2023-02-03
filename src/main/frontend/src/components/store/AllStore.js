import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Form, Table} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {createFuzzyMatcher} from "../../util/util";
import {Rating} from "@mui/material";
import Pagination from "react-js-pagination";
import PaginationBox from "../../util/PaginationBox";

function AllStore() {
    const [store, setStore] = useState([]);
    const [searchBox, setSearchBox] = useState('');

    const [page, setPage] = useState(1);
    const [items, setItems] = useState(3);
    const [data, setData] = useState(store);
    useEffect(() => {
        setTotalCount(data.length);
        setPage(1);
    }, [data])
    const [totalCount, setTotalCount] = useState(data.length - 1);
    const handlePageChange = (page) => {
        setPage(page);
    };

    const updateSearchBox = e => setSearchBox(e.target.value);
    useEffect(() => {
        setData(store.filter(v => createFuzzyMatcher(searchBox).test(v.store_name.toLowerCase())));
    }, [searchBox, store])

    useEffect(() => {
        axios.get('/AllStore')
            .then(response => {
                setStore(response.data);
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

    return (<div className="wrapper">
        <div className="main">
            <h1> 가게를 선택하세요</h1>
            <div>
                <div>
                    <div>
                        <div>
                            <input id={"searchArea"} value={searchBox} onChange={updateSearchBox}
                                   placeholder={"검색할 가게를 입력하세요."} size={50}/>
                            <button type={"button"} onClick={() => {
                                setSearchBox('')
                            }}>초기화
                            </button>
                        </div>
                    </div>
                    <table>
                        <thead>
                        <tr>
                            <th>사진</th>
                            <th>이름</th>
                            <th>주소</th>
                            <th>리뷰 개수</th>
                            <th>평균 별점</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data && totalCount === 0 ?
                            <tr>
                                <td colSpan={5}> 검색된 데이터가 없습니다.</td>
                            </tr>
                            : data.slice(items * (page - 1), items * (page - 1) + items)
                                .map(v => <tr key={v.store_id} onClick={()=>linkToStore(v.store_id)}>
                                    <td><img width={100} src={`/image/${v.store_id}`}/></td>
                                    <td>
                                        {v.store_name}
                                    </td>
                                    <td>{v.address}</td>
                                    <td>{v.numOfReviews}</td>
                                    <td>
                                        <div>
                                            <Rating name="Average_Star" value={v.averageStars} precision={0.5}
                                                    readOnly/> {v.averageStars}
                                        </div>
                                    </td>
                                </tr>,)}
                        </tbody>
                    </table>
                </div>
                <PaginationBox>
                    <Pagination
                        activePage={page}
                        itemsCountPerPage={items}
                        totalItemsCount={totalCount}
                        pageRangeDisplayed={5}
                        onChange={handlePageChange}>
                    </Pagination>
                </PaginationBox>
            </div>
        </div>
    </div>);
}

export default AllStore;

