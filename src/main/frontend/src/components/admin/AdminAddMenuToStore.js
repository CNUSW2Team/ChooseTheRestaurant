import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import {Form, Table} from "react-bootstrap";
import {Checkbox} from "antd";

function AdminAddMenuToStore(props) {

    const [store, setStore] = useState([]);
    const [storeId, setStoreId] = useState("");
    const [storeName, setStoreName] = useState("");
    const [menu, setMenu] = useState([]);

    const [isMenuLoaded, setIsMenuLoaded] = useState(0);

    const [selected, setSelected] = useState([]);

    const [menuName, setMenuName] = useState("");
    const [price, setPrice] = useState(0);
    const [file, setFile] = useState(null);
    const fileInput = useRef();

    const updateStoreId = e => {
        setStoreId(e.target.value)
    };

    function updateStoreInfo(e, storeName) {
        setStoreId(e.target.value);
        setStoreName(storeName);
    }

    const updateMenuName = e => setMenuName(e.target.value);
    const updatePrice = e => setPrice(e.target.value);
    const handleChangeFile = e => setFile(e.target.files);

    const onChangeEach = (e, id) => {
        // 체크할 시 CheckList에 id값 넣기
        if (e.target.checked) {
            setSelected([...selected, id]);
            // 체크 해제할 시 CheckList에서 해당 id값이 `아닌` 값만 배열에 넣기
        } else {
            setSelected(selected.filter((checkedId) => checkedId !== id));
        }
    }

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

    function showStoreList() {

        return (
            <div>
                <Table id={"storeTable"} className="table">
                    <thead>
                    <tr>
                        <th className="thead">선택</th>
                        <th className="thead">가게</th>
                        <th className="thead">주소</th>
                    </tr>
                    </thead>
                    <tbody className="body">
                    {store.map(s => (
                        <tr key={s.store_id}>
                            <td className="td"><input type={"radio"} name={"selectedStore"} value={s.store_id}
                                       onChange={e => updateStoreInfo(e, s.store_name)}/></td>
                            <td className="td"><img width={100} src={`/image/${s.store_id}`} onError={handleNoImg}/><br></br>{s.store_name}</td>
                            <td className="td">{s.address}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        );
    }

    const handleNoImg = (e) => {
        const path = "no_image";
        e.target.src = `/image/${path}`;
    }

    function showStoreListAgain() {
        setStoreId("");
        setStoreName("");
        setMenu([]);
        setIsMenuLoaded(0);
    }

    function showStoreMenuList() {
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

        return (
            <div>
                <Form className="left">
                    <h2>{storeName} 메뉴</h2>
                    <Table id={"menuTable"} className="table">
                        <thead>
                        <tr>
                            <th className="thead">선택</th>
                            <th className="thead">메뉴</th>
                            <th className="thead">가격</th>
                            <th className="thead">이미지</th>
                        </tr>
                        </thead>
                        <tbody className="body">
                        {menu.filter(m => !selected.includes(m.menu_id)).map(m => (
                            <tr key={m.menu_id}>
                                <td className="td"><Checkbox onChange={(e) => onChangeEach(e, m.menu_id)}
                                              checked={selected.includes(m.menu_id)}/></td>
                                <td className="td">{m.menu_name}</td>
                                <td className="td">{m.price}</td>
                                <td className="td"><img width={200} height={100} src={`/image/${m.menu_id}`} onError={handleNoImg}/></td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Form>
            </div>
        );
    }

    function showSelectedMenuList() {

        return (
            <div>
                <Form className="left">
                    <h2>선택한 메뉴</h2>
                    <Table id={"menuTable"} className="table">
                        <thead>
                        <tr>
                            <th className="thead">선택</th>
                            <th className="thead">메뉴</th>
                            <th className="thead">가격</th>
                            <th className="thead">이미지</th>
                        </tr>
                        </thead>
                        <tbody className="body">
                        {menu.filter(m => selected.includes(m.menu_id)).map(m => (
                            <tr key={m.menu_id}>
                                <td className="td"><Checkbox onChange={(e) => onChangeEach(e, m.menu_id)}
                                                                    checked={selected.includes(m.menu_id)}/></td>
                                <td className="td">{m.menu_name}</td>
                                <td className="td">{m.price}</td>
                                <td className="td"><img width={200} height={100} src={`/image/${m.menu_id}`} onError={handleNoImg}/></td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                    {selected.length ? <button onClick={(event) => removeMenu(event)}>메뉴 삭제하기</button> : ""}
                </Form>
            </div>
        );
    }

    function formAddMenu() {
        return (
            <div>
                <Form className="top">
                    <h3>메뉴 추가하기</h3>
                    <Table className="table">
                        <tbody>
                        <tr>
                            <td>메뉴 이름 :</td>
                            <td><input id={"menuName"} onChange={updateMenuName}/></td>
                        </tr>
                        <tr>
                            <td>가격 :</td>
                            <td><input id={"price"} type={"number"} onChange={updatePrice}/></td>
                        </tr>
                        <tr>
                            <td><input type={"file"} ref={fileInput} onChange={handleChangeFile}/></td>
                        </tr>
                        <tr>
                            <td>
                                <button onClick={(event) => addMenu(event)}>메뉴 추가하기</button>
                            </td>
                        </tr>
                        </tbody>
                    </Table>
                </Form>
            </div>
        );
    }

    function addMenu(e) {

        if(alertBlankInput() != 1) {
            e.preventDefault();
            return;
        }

        const menuDto = {
            menu_name: menuName, price: price,
            store_id: storeId
        }
        console.log(menuDto);
        file ? console.log(file[0]) : console.log("No image");

        const fd = new FormData();
        file ? fd.append("file", file[0]) : fd.append("file", null);
        fd.append("menuDto", JSON.stringify(menuDto));

        axios.post('http://localhost:8080/admin/requestMenuAdd', fd)
            .then((response) => {alert(response.data);})

        resetInput();
    }

    function removeMenu(e) {

        const fd = new FormData();
        selected.forEach(s => fd.append("selectedMenuId", s));

        axios.post('http://localhost:8080/requestMenuRemove', fd)
            .then((response) => {alert(response.data);})

   }
    function alertBlankInput() {
        if(!menuName) {alert("메뉴 이름을 입력해주세요");return -1;}
        else if(!price) {alert("가격을 입력해주세요");return -1;}
        return 1;
    }

    function resetInput() {
        const menuName = document.getElementById("menuName");
        const price = document.getElementById("price");

        menuName.value = "";
        price.value = null;
        fileInput.current.value = "";
    }

    return (
        <div>
            <h1>{storeName} 메뉴 관리</h1>
            {storeId ? <button onClick={showStoreListAgain}>가게 변경</button> : showStoreList()}
            {storeId ? formAddMenu() : ""}
            {!storeId ? "" : showStoreMenuList()}
            {!storeId ? "" : showSelectedMenuList()}
        </div>
    );
}

export default AdminAddMenuToStore;