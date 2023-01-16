import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Form, Table} from "react-bootstrap";
import {Link, useParams} from "react-router-dom";

function GetReady() {
    let { categoryId } = useParams();

    const [category, setData] = useState([]); 
    useEffect(() => {
            axios.get(`/AllCategory`)
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
            <h1>{category[0] && category[0]["name"]}</h1>
            <Link to={`/Round/${categoryId}/2`}><button>Round : 2강</button></Link>
            <Link to={`/Round/${categoryId}/4`}><button>Round : 4강</button></Link> 
        </div>
        
    );
}

export default GetReady;