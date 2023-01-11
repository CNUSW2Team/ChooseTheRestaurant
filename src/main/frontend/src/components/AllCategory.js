import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Form, Table} from "react-bootstrap";
import {Link} from "react-router-dom";

function AllCategory() {
    const [category, setData] = useState([]);
    useEffect(() => {
            axios.get('/category/all')
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
            <img width={500} src={`/img/${category[0] && category[0]["worldcup_id"]}.jpg`} />
            <p>{category[0] && category[0]["worldcup_name"]}</p>
            <Link to={`/WorldCup/${category[0] && category[0]["worldcup_name"]}`} ><button>시작하기</button></Link> 
        </div>
    );
}

export default AllCategory;
