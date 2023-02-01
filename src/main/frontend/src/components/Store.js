import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import Reply from "./Reply";
import Reviews from "./Reviews";
import styles from "./store.module.css"
import Menus from "./Menus";
import SideMenu from "./SideMenu";

function Store() {
    let {storeId} = useParams();
    useEffect(() => {
        axios.get(`/StoreInfo/${storeId}`)
            .then(response => {
                setData(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);
    const [store, setData] = useState([]);

    const content =
        [{idx: 0, name: '상세정보', content: <div>상세정보</div>},
            {idx: 1, name: '메뉴', content: <Menus menus={store.menu}/>},
            {idx: 2, name: '리뷰', content: <Reviews store={storeId} reviews={store.reviews}/>},
        ];

    const useTabs = (initialTabs, allTabs) => {
        const [contentIndex, setContentIndex] = useState(initialTabs);
        return {
            contentItem: allTabs[contentIndex], contentChange: setContentIndex
        };
    };
    const {contentItem, contentChange} = useTabs(0, content);

    return (<div>
            <div className={styles.wrapper}>
                <SideMenu store_name={store.store_name} onClickHandler={contentChange} contentItem={contentItem}/>
                <div className={styles.main}>
                    {contentItem.content}
                </div>
            </div>
        </div>

    );
}

export default Store;