import React, {useEffect, useState} from "react";
import axios from "axios";
import {Form} from "react-bootstrap";

function StorePage() {
    const [store, setData] = useState([]);
    useEffect(() => {
            axios.get('/image/')
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
        <Form>
            <h1>Store Details</h1>
            StoreID: {JSON.stringify(store[0]) && JSON.stringify(store[0]["store_id"])}<p></p>
            StoreName: {JSON.stringify(store[0]) && JSON.stringify(store[0]["store_name"])}<p></p>
            StoreImage: <button onClick={StorePage}> 확인하기 </button>
        </Form>
    );
}

export default StorePage;