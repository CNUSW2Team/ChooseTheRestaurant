import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Form, Table} from "react-bootstrap";
import {Link} from "react-router-dom";

function ModifyCategory() {
    const [category, setData] = useState([]);
    useEffect(() => {
            axios.get('/AllCategory')
                .then(response => {
                    setData(response.data);
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                })
        },
        []);

    function RemoveCategory(category_id) {
        const fd = new FormData();
        const categoryDto = {
            category_id: category_id
        }
        if (window.confirm("정말로 삭제하시겠습니까?")) {

            fd.append("categoryDto", JSON.stringify(categoryDto));

            axios.post('http://localhost:8080/requestCategoryRemove', fd)
                .then((response) => {
                    console.log(response.data)
                })
                .then(() => {
                    window.location.href = "/admin/ModifyCategory";
                })
        }
    }

    return (
        <div>
            <Table>
                <thead>
                <tr>
                    <th>월드컵이름</th>
                    <th>좋아요</th>
                    <th>가게 수</th>
                    <th>삭제하기</th>
                </tr>
                </thead>
                <tbody>
                {category.map(v =>
                    <tr key={v.category_id}>
                        <td>{v.category_name}</td>
                        <td>{v.favorite}</td>
                        <td>{v.num_of_stores}개</td>
                        <td>
                            <button onClick={() => RemoveCategory(v.category_id)}>삭제하기</button>
                        </td>
                    </tr>,
                )}
                </tbody>
            </Table>
        </div>
    );
}


export default ModifyCategory;
