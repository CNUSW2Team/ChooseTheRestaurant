import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Form, Table} from "react-bootstrap";
import {Link} from "react-router-dom";

function AllCategory() {
    const [category, setData] = useState([]);
    useEffect(() => {
            axios.get('/F/AllCategory')
                .then(response => {
                    setData(response.data);
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                })
        },
        []);

    return (
        <div>
            <img width={500} src={`/img/${category[0] && category[0]["category_id"]}.jpg`} />
            <p>{category[0] && category[0]["name"]}</p>
            <Link to={`/GetReady/${category[0] && category[0]["category_id"]}`} ><button>시작하기</button></Link> 
        </div>
    );
}




export default AllCategory;
