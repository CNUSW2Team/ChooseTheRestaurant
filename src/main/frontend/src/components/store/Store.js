import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import Reviews from "./Reviews";
import styles from "./store.module.css"
import Menus from "./Menus";
import SideMenu from "./SideMenu";
import MoreInfo from "./MoreInfo";

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
        [{idx: 0, name: '상세정보', content: <MoreInfo info={store}/>},
            {idx: 1, name: '메뉴', content: <Menus store={storeId}/>},
            {idx: 2, name: '리뷰', content: <Reviews store={storeId}/>},
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