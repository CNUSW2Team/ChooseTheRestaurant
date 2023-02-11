import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import {createFuzzyMatcher} from "../../util/util";
import StartButton from "../StartButton";

function AllCategory() {
    const [category, setData] = useState([]);
    const [searchBox, setSearchBox] = useState('');
    const updateSearchBox = e => setSearchBox(e.target.value);

    useEffect(() => {
        axios.get('/AllCategory')
            .then(response => {
                setData(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);


    return (
        <div className="flex-column m-5">
            <h4 className="p-2">진행할 월드컵을 선택하세요</h4>
            <div className="p-2 d-flex justify-content-between">
                <div className="d-flex w-50">
                    <input type="email" className="form-control w-75" id="searchArea" value={searchBox}
                           onChange={updateSearchBox}
                           placeholder="검색할 월드컵을 입력하세요."/>
                    <button className="btn btn-outline-secondary" type="submit" onClick={() => setSearchBox('')}>초기화
                    </button>
                </div>
                <button className="btn btn-outline-primary" type="submit"
                        onClick={() => window.location.href = '/AddCategory'}>월드컵 만들기
                </button>
            </div>

            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 row-cols-xxl-5 g-4 w-100 m-auto">
                {category.filter(v => createFuzzyMatcher(searchBox).test(v.category_name.toLowerCase())).map(v =>
                    <div className="col" key={v.category_id}>
                        <div className="card shadow">
                            <img src={`/image/${v.category_id}`} className="card-img-top " alt="..."/>
                            <p className="text-end bg-danger text-white p-1">
                                Favorite: {v.favorite}
                            </p>
                            <div className="p-3 d-flex flex-column align-items-end">
                                <h5 className="card-title fw-bold text-nowrap text-truncate w-100">{v.category_name}</h5>
                                <div className="btn-group btn-group-sm my-3">
                                    <StartButton value={"시작하기"} category_name={v.category_name} category_id={v.category_id} num_of_stores={v.num_of_stores}/>
                                    <button type="button" className="btn btn-outline-primary"
                                            onClick={() => window.location.href = `/Ranking/${v.category_id}`}>랭킹보기
                                    </button>
                                </div>
                                <p className="card-text text-end">
                                    등록된 가게: {v.num_of_stores}
                                </p>
                            </div>
                        </div>
                    </div>,)}
            </div>
        </div>
    )
}


export default AllCategory;
