import React, {useEffect, useState} from 'react';
import axios from "axios";
import {createFuzzyMatcher} from "../../util/util";
import {Rating} from "@mui/material";

function AllStore() {
    const [store, setStore] = useState([]);
    const [searchBox, setSearchBox] = useState('');

    const updateSearchBox = e => setSearchBox(e.target.value);

    useEffect(() => {
        axios.get('/api/Store')
            .then(response => {
                setStore(response.data);
                // console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    return (<div className="p-5 pt-3">
        <i className="bi bi-arrow-left btn" onClick={() => window.location.href = "/admin"}>처음으로</i>
        <h4 className="p-2"> 수정할 가게를 선택하세요</h4>
        <div>
            <div className="p-2 d-flex justify-content-between">
                <div className="d-flex">
                    <input className="form-control" id="searchArea" value={searchBox}
                           onChange={updateSearchBox}
                           style={{width: "350px"}}
                           placeholder="검색할 가게를 입력하세요."/>
                    <button className="btn btn-outline-secondary" type="submit" onClick={() => setSearchBox('')}>초기화
                    </button>
                </div>

                <button className="btn btn-outline-primary"
                        onClick={() => window.location.href = '/admin/AddStore'}>가게 추가하기
                </button>
            </div>

            <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 row-cols-xxl-4 g-4 w-100 m-auto">
                {store.filter(v => createFuzzyMatcher(searchBox).test(v.store_name.toLowerCase())).map(v =>
                        <div className="col" key={v.store_id} onClick={() => window.location.href = `/admin/Store/${v.store_id}`}>
                            <div className="card shadow">
                                <div className="row g-2">
                                    <div className="col">
                                        <img src={`/image/${v.store_id}`} className="rounded-start img-fluid h-100"
                                             style={{objectFit: "cover"}}/>
                                    </div>
                                    <div className="col" style={{minHeight: "250px"}}>
                                        <div className="card-body d-flex flex-column justify-content-evenly h-100">
                                            <h5 className="card-title fw-bold w-100">{v.store_name}</h5>
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
            </div>
        </div>
    </div>);
}

export default AllStore;

