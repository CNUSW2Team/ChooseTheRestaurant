import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Checkbox} from "antd";
import {Table} from "react-bootstrap";
function AdminAddMenuToStore(props) {

    const [store, setStore] = useState([]);
    const [storeId, setStoreId] = useState("");
    const [menu, setMenu] = useState([]);
    const [isMenuLoaded, setIsMenuLoaded] = useState(0);

    const updateStoreId = e => {setStoreId(e.target.value)};


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
                            <td><input type={"radio"} name={"selectedStore"} value={s.store_id} onChange={updateStoreId}/></td>
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
        setMenu([]);
        setIsMenuLoaded(0);
    }

    function printStoreMenuList() {
        if(!menu.length && !isMenuLoaded) {
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
        if(isMenuLoaded && !menu.length)
            return (
                <h3>선택한 가게에 메뉴가 존재하지 않습니다.</h3>
            );
        
        return (
          <div>
              <div>
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

          </div>
        );
    }



    return (
        <div>
            <h1>Hello Menu</h1>
            {storeId ? <button onClick={showStoreList}>가게 변경</button> : printStoreList()}
            {!storeId ? <h2>가게를 선택해주세요</h2> : printStoreMenuList()}
        </div>
    );
}

export default AdminAddMenuToStore;