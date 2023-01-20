import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Form, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import {createFuzzyMatcher} from "../util/util";

function AllCategory() {
    const [category, setData] = useState([]);
    const [searchBox, setSearchBox] = useState('');
    const updateSearchBox = e => setSearchBox(e.target.value);
    const resetSearchBox = () => setSearchBox('');

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

    return (<div>
        <div><input id={"searchArea"} value={searchBox} onChange={updateSearchBox}
                    placeholder={"Type 'Name' to Search"}/>
            <button type={"button"} onClick={resetSearchBox}>clear</button>
            {category.filter(v => createFuzzyMatcher(searchBox).test(v.category_name)).length}개 검색됨
        </div>
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>월드컵이름</th>
                <th>사진</th>
                <th>좋아요</th>
                <th>가게 수</th>
                <th>시작하기</th>
            </tr>
            </thead>
            <tbody>
            {category.filter(v => createFuzzyMatcher(searchBox).test(v.category_name)).map(v => <tr key={v.category_id}>
                <td>{v.category_name}</td>
                <td><img width={400} src={`/img/${v.category_id}.jpg`}/></td>
                <td>{v.favorite}</td>
                <td>{v.num_of_stores}개</td>
                <td><Link to={`/GetReady/${v.category_id}`}> 시작하기 </Link></td>
            </tr>,)}
            </tbody>
        </Table>

        <button><Link to={`/AddCategory`}> 월드컵 만들기 </Link></button>
    </div>);
}


export default AllCategory;
