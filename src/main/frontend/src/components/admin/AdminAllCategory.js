import React, {useEffect, useState} from 'react';
import axios from "axios";
import {createFuzzyMatcher} from "../../util/util";
import StartButton from "../worldcup/StartButton";

function ModifyEntities() {
    const [searchBox, setSearchBox] = useState('');
    const [category, setCategory] = useState([]);
    const updateSearchBox = e => setSearchBox(e.target.value);

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

    function RemoveCategory(category_id) {
        if (window.confirm("정말로 삭제하시겠습니까?")) {
            axios.delete(`/api/Category/${category_id}`)
                .then(() => {
                    axios.get('/api/Category')
                        .then(response => {
                            setCategory(response.data);
                            console.log(response.data);
                        })
                        .catch(error => {
                            console.log(error);
                        })
                })
                .then((response) => {
                    console.log(response.data)
                })
        }
    }

    return (
        <div className="p-5 pt-3">
            <i className="bi bi-arrow-left btn" onClick={() => window.location.href = "/admin"}>처음으로</i>
            <h4 className="p-2">수정할 월드컵을 선택하세요</h4>
            <div className="d-flex p-2">
                <input className="form-control" id="searchArea" value={searchBox}
                       onChange={updateSearchBox}
                       style={{width: "350px"}}
                       placeholder="검색할 월드컵을 입력하세요."/>
                <button className="btn btn-outline-secondary" type="submit" onClick={() => setSearchBox('')}>
                    초기화
                </button>
            </div>
            <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-xl-5 row-cols-xxl-6 g-4 w-100 m-auto">
                {category.filter(v => createFuzzyMatcher(searchBox).test(v.category_name.toLowerCase())).map(v =>
                    <div className="col" key={v.category_id}>
                        <div className="card shadow">
                            <img src={`/image/${v.category_id}`} className="card-img-top " alt="..."/>
                            <div className="p-3 d-flex flex-column align-items-end">
                                <h5 className="card-title fw-bold text-nowrap text-truncate w-100">{v.category_name}</h5>
                                <button className="btn btn-sm btn-danger" onClick={() => RemoveCategory(v.category_id)}> 삭제하기 </button>
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
    );
}


export default ModifyEntities;
