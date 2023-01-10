import React from 'react';
import {Link, useParams} from "react-router-dom";

function Store() {
    let { storeId } = useParams();
    return (
        <div>
            StoreID: {storeId}<p></p>
            {/*StoreName: {JSON.stringify(store[0]) && JSON.stringify(store[0]["store_name"])}<p></p>*/}
            <img src={`/img/${storeId}.jpg`} />
        </div>

    );
}

export default Store;