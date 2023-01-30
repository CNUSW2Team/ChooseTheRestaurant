import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {Table} from "react-bootstrap";
import tableStyle from "./table.module.css"
import tabStyle from "./storetab.module.css"
import Reply from "./Reply";
import Reviews from "./Reviews";
import half from "./store.module.css"
import Menus from "./Menus";

function Store() {
    let {storeId} = useParams();
    const [store, setData] = useState([]);

    const content  = [
        { name: '메뉴', content: <Menus menus={store.menu}/> },
        { name: '리뷰', content: <div><Reviews reviews={store.reviews}/><div style={{position: "sticky", top:"100"}}><Reply store={storeId}/></div></div> },
    ];

    const useTabs = (initialTabs, allTabs) => {
        const [contentIndex, setContentIndex] = useState(initialTabs);
        return {
            contentItem: allTabs[contentIndex],
            contentChange: setContentIndex
        };
    };
    const { contentItem, contentChange } = useTabs(0, content);


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

            <div className={half.left}>
                <div style={{display: "flex", justifyContent: "center", margin: "auto"}}>
                    <div>
                        <Table className={tableStyle.table}>
                            <thead className={tableStyle.thead}>
                            <tr >
                                <th colSpan={2} className={tableStyle.th}>{store.store_name}</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td colSpan={2} className={tableStyle.td}><img width={400} height={300} src={`/image/${storeId}`}/></td>
                            </tr>
                            <tr>
                                <td colSpan={2} className={tableStyle.td}> 주소: {store.address} </td>
                            </tr>
                            <tr>
                                <td colSpan={2} className={tableStyle.td}> 연락처: {store.contact} </td>
                            </tr>
                            <tr>
                                <td colSpan={2} className={tableStyle.td}> 별점: {store.averageStars}점</td>
                            </tr>
                            </tbody>
                        </Table>
                    </div>
                    <div>
                        <Table className={tableStyle.table}>
                            <thead className={tableStyle.thead}>
                            <tr>
                                <th className={tableStyle.th}>요일</th>
                                <th className={tableStyle.th}>시간</th>
                            </tr>
                            </thead>
                            <tbody>
                            {store.times && store.times.map(v => <tr>
                                <td className={tableStyle.td}>{v.day}</td>
                                <td className={tableStyle.td}>{v.hours}</td>
                            </tr>,)}
                            </tbody>
                        </Table>
                    </div>
                </div>

            </div>

            <div className={half.right}>
                <ul className={tabStyle.ul}>{content.map((section, index) => (
                    <li className={tabStyle.li} onClick={() => contentChange(index)}> {section.name} </li>
                ))}</ul>
                {contentItem.content}
            </div>
        </div>

    );
}

export default Store;