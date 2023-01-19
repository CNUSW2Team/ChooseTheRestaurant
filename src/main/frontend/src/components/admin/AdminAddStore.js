import React, {useRef} from 'react';
import {Link} from "react-router-dom";

import {useEffect, useState} from 'react';
import axios from "axios";

function AdminAddStore() {
    const [store_name, setStoreName] = useState('');
    const [address, setAddress] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [opening_hours, setOpeningHours] = useState('');
    const [file, setFile] = useState(null);

    const updateStoreName = e => setStoreName(e.target.value);
    const updateAddress = e => setAddress(e.target.value);
    const updatePhoneNumber = e => setPhoneNumber(e.target.value);
    const updateOpeningHours = e => setOpeningHours(e.target.value);
    const handleChangeFile = e => {
        setFile(e.target.files);
        previewImg(e.target.files);
    }
    function previewImg(files) {
        const imgBox = document.getElementById("imgBox");
        if(files.length == 0) {
            imgBox.src = `/img/icon/istockphoto-1206577970-170667a.jpg`;
            return;
        }
        const reader = new FileReader();
        reader.onload = () =>
            ( imgBox.src = reader.result);
        reader.readAsDataURL(files[0]);
    }

    function Send(){

        if(alertBlankInput() != 1) return;

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
            .then((response) => {alert(response.data);})

        resetInput();
    }

    function alertBlankInput() {
        if(!store_name) {alert("가게 이름을 입력해주세요");return -1;}
        else if(!address) {alert("주소를 입력해주세요");return -1;}
        else if(!phone_number) {alert("연락처를 입력해주세요");return -1;}
        else if(!opening_hours) {alert("영업시간을 입력해주세요");return -1;}
        else if(!file) { alert("가게의 이미지를 업로드해주세요"); return -1;}
        return 1;
    }
    function resetInput() {
        const storeId = document.getElementById("storeId");
        const address = document.getElementById("address");
        const phoneNumber = document.getElementById("phoneNumber");
        const openingHours = document.getElementById("openingHours");
        const imageFile = document.getElementById("imageFile");

        storeId.value = '';
        address.value = '';
        phoneNumber.value = '';
        openingHours.value = '';
        imageFile.value = null;
    }

    return (
        <div>
            <h2>새로운 가게 추가하기</h2>
            <div style={{
                border: "1px solid black",
                backgroundColor: "white",
                padding: "20px 20px 20px 20px",
                overflow: "hidden"
            }}>
                <table>
                    <tbody >
                    <tr >
                        <td style={{padding: "20px 20px 10px 20px"}}><b>가게이름 </b>: </td>
                        <td><input id={"storeId"} onChange={updateStoreName}/></td>
                    </tr>
                    <tr>
                        <td style={{padding: "20px 20px 10px 20px"}}><b>주소 </b>: </td>
                        <td><input id={"address"} onChange={updateAddress}/></td>
                    </tr>
                    <tr>
                        <td style={{padding: "20px 20px 20px 20px"}}><b>연락처 </b>: </td>
                        <td><input id={"phoneNumber"} onChange={updatePhoneNumber}/></td>
                    </tr>
                    </tbody>
                </table>
                <table>
                    <tbody>
                    <tr><td style={{padding: "10px 0px 10px 20px"}}><b>영업시간 </b>: </td></tr>
                    <tr><td style={{padding: "10px 0px 10px 20px"}}><textarea id={"openingHours"} cols={30} rows={8} onChange={updateOpeningHours}/></td></tr>
                    <tr>
                        <td style={{padding: "10px 0px 10px 20px"}}><input type={"file"} onChange={handleChangeFile}/><br/><br/>
                        <img id={"imgBox"}  width={300} height={240} src={`/img/icon/istockphoto-1206577970-170667a.jpg`}/></td>
                    </tr>
                    <tr><td style={{padding: "10px 0px 10px 20px"}}><button onClick={() => Send()}>등록하기</button></td></tr>
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default AdminAddStore;