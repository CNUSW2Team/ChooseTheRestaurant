import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Table} from "react-bootstrap";

function AdminAddMenuToStore(props) {

    const [store, setStore] = useState([]);
    const [storeId, setStoreId] = useState("");
    const [storeName, setStoreName] = useState("");
    const [menu, setMenu] = useState([]);
    const [isMenuLoaded, setIsMenuLoaded] = useState(0);

    const [menuName, setMenuName] = useState([]);
    const [price, setPrice] = useState([]);
    const [file, setFile] = useState(null);

    const updateStoreId = e => {
        setStoreId(e.target.value)
    };

    function updateStoreInfo(e, storeName) {
        setStoreId(e.target.value);
        setStoreName(storeName);
    }

    const updateMenuName = e => setMenuName(menuName => [...menuName, e.target.value]);
    const updatePrice = e => setPrice(price => [...price, e.target.value]);
    const handleChangeFile = e => setFile(e.target.files);

    useEffect(() => {
            axios.get('/AllStore')
                .then(response => {
                    setStore(response.data);
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                })
        },
        []);

    function printStoreList() {

        return (
            <div>
                <Table id={"storeTable"}>
                    <thead>
                    <tr>
                        <th>선택</th>
                        <th>가게이름</th>
                        <th>주소</th>
                    </tr>
                    </thead>
                    <tbody>
                    {store.map(s => (
                        <tr key={s.store_id}>
                            <td><input type={"radio"} name={"selectedStore"} value={s.store_id}
                                       onChange={e => updateStoreInfo(e, s.store_name)}/></td>
                            <td>{s.store_name}</td>
                            <td>{s.address}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        );
    }

    function showStoreList() {
        setStoreId("");
        setStoreName("");
        setMenu([]);
        setIsMenuLoaded(0);
    }

    function printStoreMenuList() {
        if (!menu.length && !isMenuLoaded) {
            axios.get(`http://localhost:8080/StoreMenusInfo/${storeId}`)
                .then(response => {
                    setMenu(response.data);
                    setIsMenuLoaded(1);
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                })
        }
        if (isMenuLoaded && !menu.length)
            return (
                <h3>선택한 가게에 메뉴가 존재하지 않습니다.</h3>
            );

        return (
            <div>
                <h2>{storeName} 메뉴</h2>
                <Table id={"menuTable"}>
                    <thead>
                    <tr>
                        <th>선택</th>
                        <th>메뉴</th>
                        <th>가격</th>
                        <th>이미지</th>
                    </tr>
                    </thead>
                    <tbody>
                    {menu.map(m => (
                        <tr key={m.menu_id}>
                            <td><input type={"checkbox"} name={"selectedMenu"} value={m.menu_id}/></td>
                            <td>{m.menu_name}</td>
                            <td>{m.price}</td>
                            <td><img width={200} height={100} src={`/img/${m.menu_id}.jpg`}/></td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        );
    }

    function formAddMenu() {
        return (
            <div style={{
                border: "1px solid black",
                backgroundColor: "white",
                padding: "20px 20px 20px 20px",
                overflow: "hidden"
            }}>
                <h2>메뉴 추가하기</h2>
                <table>
                    <tbody>
                    <tr>
                        <td>메뉴 이름 :</td>
                        <td><input onChange={updateMenuName}/></td>
                    </tr>
                    <tr>
                        <td>가격 :</td>
                        <td><input onChange={updatePrice}/></td>
                    </tr>
                    <tr>
                        <td><input type={"file"} onChange={handleChangeFile}/></td>
                    </tr>
                    <tr>
                        <td>
                            <button onClick={() => addMenu()}>메뉴 추가하기</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }

    function addMenu() {
        console.log(file[0]);
    }

    return (
        <div>
            <h1>Hello Menu</h1>
            {storeId ? <button onClick={showStoreList}>가게 변경</button> : printStoreList()}
            {!storeId ? <h2>가게를 선택해주세요</h2> : printStoreMenuList()}
            {storeId ? formAddMenu() : ""}
            {}
        </div>
    );
}

export default AdminAddMenuToStore;