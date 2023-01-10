import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";

function Store() {
    let { storeId } = useParams();

    const [store, setData] = useState([]);
    useEffect(() => {
            axios.get(`/store/${storeId}`)
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
            {/* <p>StoreID: {JSON.stringify(store) && JSON.stringify(store['store_id'])}</p> */}
            {/* <p>StoreID: {JSON.stringify(store['store_id'])}</p> */}
            StoreID: {JSON.stringify(store['store_id'])}
            StoreName: {JSON.stringify(store) && JSON.stringify(store['store_name'])}<p></p>
            <img src={`/img/${storeId}.jpg`} />
        </div>

    );
}

export default Store;