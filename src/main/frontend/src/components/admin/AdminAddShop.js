import React from 'react';
import {Link} from "react-router-dom";

import {useEffect, useState} from 'react';
import axios from "axios";

function AdminAddShop() {
    const [store_name, setStoreName] = useState('');
    const [address, setAddress] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [opening_hours, setOpeningHours] = useState('');
    const [file, setFile] = useState(null);

    const updateStoreName = e => setStoreName(e.target.value);
    const updateAddress = e => setAddress(e.target.value);
    const updatePhoneNumber = e => setPhoneNumber(e.target.value);
    const updateOpeningHours = e => setOpeningHours(e.target.value);
    const handleChangeFile = e => setFile(e.target.files);

    function Send(){
        console.log(store_name);
        console.log(address);
        console.log(phone_number);
        console.log(opening_hours);

        const fd = new FormData();
        Object.values(file).forEach((file) => fd.append("files", file));

        const storeDto = {
            store_name: store_name, address:address,
            phone_number:phone_number, opening_hours:opening_hours
        }
        fd.append("storeDto", JSON.stringify(storeDto));

        axios.post('http://localhost:8080/admin/requestStoreAdd', fd)
            .then((response) => {console.log(response.data)})
    }

    return (
        <div>
            <h2>새로운 가게 추가하기</h2>
            가게이름 : <input onChange={updateStoreName}></input><br/><br/>
            주소 : <input onChange={updateAddress}></input><br/><br/>
            연락처 : <input onChange={updatePhoneNumber}></input><br/><br/>
            영업시간 : <input onChange={updateOpeningHours}></input><br/><br/>
            이미지 : <input type={"file"} onChange={handleChangeFile}/><br/><br/>
            <button onClick={() => Send()}>등록하기</button>
        </div>
    );
}

export default AdminAddShop;