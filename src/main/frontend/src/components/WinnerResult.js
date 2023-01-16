import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Form, Table} from "react-bootstrap";
import {Link, useParams} from "react-router-dom";

function WinnerResult(){
    let { categoryId } = useParams();
    let { storeId } = useParams();

    const [storeInfo, setData] = useState([]);
    useEffect(() => {
            axios.get(`/Result/${categoryId}/${storeId}`)
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
            <img width={500} src={`/img/${storeId}.jpg`} />
        </div>
    );        
}

export default WinnerResult;