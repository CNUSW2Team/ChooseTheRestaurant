import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import AdminMenus from "./AdminMenus";
import AdminMoreInfo from "./AdminMoreInfo";

function Store() {
    let {storeId} = useParams();
    useEffect(() => {
        axios.get(`/api/Store/${storeId}`)
            .then(response => {
                setData(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);
    const [store, setData] = useState([]);

    return (
        <div>
            <h2 className="d-flex justify-content-center align-items-center text-white" style={{
                backgroundImage: `url("/image/${storeId}")`,
                height: "180px",
                backgroundSize: "cover",
                backgroundPositionY: "center"
            }}>{store.store_name}</h2>
            {/*<h5 className="">{store.store_name}</h5>*/}
            <div className="row m-5">
                <div className="col-lg-auto mb-5">
                    <AdminMoreInfo info={store}/>
                </div>
                <div className="col">
                    <AdminMenus store={storeId}/>
                </div>
            </div>
        </div>

    );
}

export default Store;