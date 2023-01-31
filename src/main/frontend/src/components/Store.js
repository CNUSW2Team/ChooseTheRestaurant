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
    const [store, setData] = useState([]);

    function replyTab(index){
        contentChange(index);
    }

    const content =
        [{name: '상세정보', content: <div>상세정보</div>},
            {name: '메뉴', content: <Menus menus={store.menu}/>},
            {name: '리뷰', content: <Reviews onClickHandler={replyTab} reviews={store.reviews}/>},
            {name: '리뷰 남기기', content: <Reply store={storeId}/>}
        ];

    const useTabs = (initialTabs, allTabs) => {
        const [contentIndex, setContentIndex] = useState(initialTabs);
        return {
            contentItem: allTabs[contentIndex], contentChange: setContentIndex
        };
    };
    const {contentItem, contentChange} = useTabs(0, content);


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


    return (<div>
            <div className={styles.wrapper}>
                <SideMenu store_name={store.store_name} onClickHandler={contentChange}/>
                <div className={styles.main}>
                    {contentItem.content}
                </div>
            </div>
        </div>

    );
}

export default Store;