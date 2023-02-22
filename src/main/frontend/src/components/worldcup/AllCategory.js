import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import {createFuzzyMatcher} from "../../util/util";
import StartButton from "./StartButton";

function AllCategory() {
    const [searchBox, setSearchBox] = useState('');
    const [category, setCategory] = useState([]);
    const updateSearchBox = e => setSearchBox(e.target.value);
    const [sort, setSort] = useState('인기순');

    useEffect(() => {
        axios.get('/api/Category')
            .then(response => {
                setCategory(response.data);
                // console.log("initial:", response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    function updateSort(value){
        setSort(value);
        switch (value) {
            case '인기순':
                category.sort((a, b) => {
                    if(a.favorite === b.favorite){
                        const upperCaseA = a.category_name.toUpperCase();
                        const upperCaseB = b.category_name.toUpperCase();

                        if (upperCaseA > upperCaseB) return 1;
                        if (upperCaseA < upperCaseB) return -1;
                        if (upperCaseA === upperCaseB) return 0;
                    }
                    else{
                        return b.favorite - a.favorite;
                    }
                });
                break;
            case '최신순':
                category.sort((a, b) => {
                    const date_a = new Date(a.created_at);
                    const date_b = new Date(b.created_at);
                    return date_b - date_a;
                });
                break;
            case '이름순':
                category.sort((a, b) => {
                    const upperCaseA = a.category_name.toUpperCase();
                    const upperCaseB = b.category_name.toUpperCase();

                    if (upperCaseA > upperCaseB) return 1;
                    if (upperCaseA < upperCaseB) return -1;
                    if (upperCaseA === upperCaseB) return 0;
                });
                break;
        }
    }

    return (
        <div className="flex-column m-5">
            <h4 className="p-2">진행할 월드컵을 선택하세요</h4>
            <div className="p-2 d-flex justify-content-between">
                <div className="d-flex">
                    <input className="form-control" id="searchArea" value={searchBox}
                           onChange={updateSearchBox}
                           style={{width: "350px"}}
                           placeholder="검색할 월드컵을 입력하세요."/>
                    <button className="btn btn-outline-secondary" type="submit" onClick={() => setSearchBox('')}>초기화
                    </button>
                    <div className="dropdown">
                        <button className="btn btn-outline-primary dropdown-toggle" type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false">{sort}
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#"
                                   onClick={() => updateSort('인기순')}>인기순</a></li>
                            <li><a className="dropdown-item" href="#"
                                   onClick={() => updateSort('최신순')}>최신순</a></li>
                            <li><a className="dropdown-item" href="#"
                                   onClick={() => updateSort('이름순')}>이름순</a></li>
                        </ul>
                    </div>
                </div>

                <button className="btn btn-outline-primary"
                        onClick={() => window.location.href = '/AddCategory'}>월드컵 만들기
                </button>
            </div>

            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 row-cols-xxl-5 g-4 w-100 m-auto">
                {category.filter(v => createFuzzyMatcher(searchBox).test(v.category_name.toLowerCase())).map(v =>
                    <div className="col" key={v.category_id}>
                        <div className="card shadow">
                            <img src={`/image/${v.category_id}`} className="card-img-top " alt="..."/>
                            <div className="text-end bg-danger text-white pe-3 py-1">
                                ♥ {v.favorite}
                            </div>
                            <div className="p-3 d-flex flex-column align-items-end">
                                <h5 className="card-title fw-bold text-nowrap text-truncate w-100">{v.category_name}</h5>
                                <div className="btn-group btn-group-sm my-3">
                                    <StartButton value={"시작하기"} category_name={v.category_name}
                                                 category_id={v.category_id} num_of_stores={v.num_of_stores}/>
                                    <button type="button" className="btn btn-outline-secondary"
                                            onClick={() => window.location.href = `/Ranking/${v.category_id}`}>랭킹보기
                                    </button>
                                </div>
                            </div>
                            <div className="card-footer d-flex justify-content-evenly align-items-center">
                                <small className="text-muted">{v.created_at}</small>
                                <hr className="vr"/>
                                <small className="text-muted">{v.num_of_stores}개의 후보</small>
                            </div>
                        </div>
                    </div>,)}
            </div>
        </div>
    )
}


export default AllCategory;
