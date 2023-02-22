import React, {useEffect, useState} from 'react';
import axios from "axios";
import {createFuzzyMatcher} from "../../util/util";
import {Rating} from "@mui/material";
import {prohibitionNonAdmin} from "../auth/AdminUtil";

function AllStore() {
    const [tag, setTag] = useState([]);
    const [searchBox, setSearchBox] = useState('');
    const [newTag, setNewTag] = useState('');

    const updateSearchBox = e => setSearchBox(e.target.value);
    const updateNewTag = e => setNewTag(e.target.value);

    useEffect(() => {
        prohibitionNonAdmin();
    }, [])

    function addTag() {
        if (newTag.length === 0) {
            alert("태그를 입력해주세요.");
            return;
        }

        const fd = new FormData();

        fd.append("tag", newTag);

        axios.post('/api/Tag', fd)
            .then(() => {
                axios.get('/api/Tag')
                    .then(response => {
                        setTag(response.data);
                        console.log(response.data);
                    })
                    .catch(error => {
                        console.log(error);
                    })
                setNewTag('');
                alert("태그 등록 완료.");
            })
            .catch(error => {
                console.log(error);
            })
    }

    function deleteTag(e){
        if (window.confirm("'" + e.target.value + "'을/를 삭제하시겠습니까?")) {
            axios.delete(`/api/Tag/${e.target.value}`)
                .then(() => {
                    axios.get('/api/Tag')
                        .then(response => {
                            setTag(response.data);
                        })
                        .catch(error => {
                            console.log(error);
                        })
                    alert("태그 삭제 완료.");
                })
        }
    }

    useEffect(() => {
        axios.get('/api/Tag')
            .then(response => {
                setTag(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    return (<div className="p-5 pt-3">
        <i className="bi bi-arrow-left btn" onClick={() => window.location.href = "/admin"}>처음으로</i>
        <h4 className="p-2"> 태그 관리 페이지 </h4>
        <div className="p-2 d-flex justify-content-between">
            <div className="d-flex w-100 justify-content-between">
                <div className="d-flex">
                    <input className="form-control" id="searchArea" value={searchBox}
                           onChange={updateSearchBox}
                           style={{width: "350px"}}
                           placeholder="검색할 태그를 입력하세요."/>
                    <button className="btn btn-outline-secondary" type="submit" onClick={() => setSearchBox('')}>초기화
                    </button>
                </div>
                <div className="d-flex">
                    <input className="form-control" id="searchArea" value={newTag}
                           onChange={updateNewTag}
                           style={{width: "350px"}}
                           placeholder="추가할 태그를 입력하세요."/>
                    <button className="btn btn-outline-secondary" type="submit" onClick={addTag}>저장
                    </button>
                </div>
            </div>
        </div>
        <div className="m-2">
            {tag.filter(v => createFuzzyMatcher(searchBox).test(v.tag.toLowerCase())).map(v =>
                <button className="btn btn-sm btn-primary rounded-4 m-1" key={v.tag} onClick={deleteTag} value={v.tag}>#{v.tag}</button>
            )}
        </div>
    </div>);
}

export default AllStore;

