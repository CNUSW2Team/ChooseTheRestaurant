import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import {Container as MapDiv, Marker, NaverMap, useNavermaps} from 'react-naver-maps'
import AddTags from "./AddTags";

function AdminStore() {
    let {storeId} = useParams();
    const navermaps = useNavermaps();

    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [store, setStore] = useState([]);
    const [menu, setMenu] = useState([]);
    const [newMenu, setNewMenu] = useState([]);
    const [idx, setIdx] = useState(1);

    useEffect(() => {
        axios.get(`/api/Menu/${storeId}`)
            .then(response => {
                setMenu(response.data);
                // console.log("Menu: ", response.data);
            })
            .catch(error => {
                console.log(error);
            })
        axios.get(`/api/Store/${storeId}`)
            .then(response => {
                setStore(response.data);
                // console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    // useEffect(() => {
    //     console.log(newMenu);
    // }, [newMenu]);

    function removeMenu(id) {
        if (window.confirm("정말로 삭제하시겠습니까?")) {
            axios.delete(`/api/Menu/${id}`)
                .then(() => {
                    axios.get(`/api/Menu/${storeId}`)
                        .then(response => {
                            setMenu(response.data);
                            // console.log("Menu: ", response.data);
                        })
                        .catch(error => {
                            console.log(error);
                        })
                })
        }
    }

    function handleMenu(e) {
        const value = e.target.value;
        const name = e.target.name;
        setNewMenu(newMenu.map((item) => {
            return item.idx === parseInt(name) ? {...item, menu_name: value} : item;
        }));
    }

    function handlePrice(e) {
        const value = e.target.value;
        const name = e.target.name;
        setNewMenu(newMenu.map((item) => {
            return item.idx === parseInt(name) ? {...item, price: value} : item;
        }));
    }

    function handleImg(e) {
        const img = e.target.files[0];
        const name = e.target.name;
        setNewMenu(newMenu.map((item) => {
            return item.idx === parseInt(name) ? {...item, img} : item;
        }));
    }

    function deleteNewMenu(e) {
        const value = e.target.value;
        setNewMenu(newMenu.filter((item) =>
            item.idx !== parseInt(value)
        ));
    }

    function removeStore(store_id) {
        if (window.confirm("정말로 삭제하시겠습니까?\n관련된 메뉴, 코멘트, 리뷰가 모두 삭제되며,\n카테고리에 등록된 가게 또한 삭제됩니다.\n해당 작업은 되돌릴 수 없습니다.")) {
            axios.delete(`/api/Store/${store_id}`)
                .then(() => {
                    window.location.href = "/admin/AllStore";
                })
        }
    }

    function submitChange() {
        let check = true;
        newMenu.forEach(menu => {
            if (menu.menu_name === "" || menu.price === "" || menu.img === "") {
                check = false;
            }
        })

        if (!check) {
            alert("메뉴, 가격, 사진을 모두 입력해주세요.");
            return;
        }

        const fd = new FormData();

        newMenu.forEach((menu) => {
            fd.append("img", menu.img);
            fd.append("menu_name", menu.menu_name);
            fd.append("price", menu.price);
            fd.append("tag", menu.tag);
        });

        const storeDto = {
            storeId: storeId,
            address: address,
            phoneNumber: phoneNumber,
        }
        fd.append("storeDto", JSON.stringify(storeDto));


        axios.put('/api/admin/Store', fd)
            .then(() => {
                axios.get(`/api/Menu/${storeId}`)
                    .then(response => {
                        setMenu(response.data);
                    })
                    .catch(error => {
                        console.log(error);
                    })
                axios.get(`/api/Store/${storeId}`)
                    .then(response => {
                        setStore(response.data);
                    })
                    .catch(error => {
                        console.log(error);
                    })
                alert("저장 완료.");
            })
            .catch(error => {
                console.log(error);
            })

        setNewMenu([]);
        setAddress("");
        setPhoneNumber("");
    }

    return (
        <div className="d-flex flex-column align-items-start">
            <h2 className="d-flex justify-content-center align-items-center text-white w-100"
                style={{
                    backgroundImage: `url("/image/${storeId}")`,
                    height: "180px",
                    backgroundSize: "cover",
                    backgroundPositionY: "center"
                }}>{store.store_name}</h2>
            <i className="bi bi-arrow-left btn" onClick={() => window.location.href = "/admin/AllStore"}>이전으로</i>
            <div className="row m-5">
                {/* 지도및 상세정보 */}
                <div className="col-lg-auto mb-5">
                    <div
                        className="d-flex flex-column align-items-center mt-5 me-5 bg-light p-4 rounded-4 justify-content-between"
                        style={{width: "450px", height: "500px"}}>
                        <MapDiv style={{width: "100%", height: "100%"}}>
                            <NaverMap
                                defaultCenter={new navermaps.LatLng(37.3595704, 127.105399)}
                                defaultZoom={15}>
                                <Marker
                                    defaultPosition={new navermaps.LatLng(37.3595704, 127.105399)}
                                />
                            </NaverMap>
                        </MapDiv>

                        <div className="input-group input-group-sm mb-3">
                            <span className="input-group-text" id="address">주소</span>
                            <input type="text" className="form-control text-center" value={address}
                                   placeholder={store.address}
                                   onChange={(e) => setAddress(e.target.value)}/>
                        </div>
                        <div className="input-group input-group-sm mb-3">
                            <span className="input-group-text" id="phoneNumber">전화</span>
                            <input type="text" className="form-control text-center" value={phoneNumber}
                                   placeholder={store.contact}
                                   onChange={(e) => setPhoneNumber(e.target.value)}/>
                        </div>
                    </div>
                </div>
                {/* 메뉴 수정 */}
                <div className="col">
                    <div className="row row-cols-1 row-cols-xl-2 row-cols-xxl-3 g-4 w-100 m-auto">
                        {/* 등록된 메뉴 */}
                        {menu.map(v =>
                                <div className="col" key={v.menu_id}>
                                    <div className="card shadow">
                                        <div className="row">
                                            <div className="col-5">
                                                <img src={`/image/${v.menu_id}`} className="rounded-start img-fluid h-100"
                                                     style={{objectFit: "cover"}}/>
                                            </div>
                                            <div className="col-7" style={{minHeight: "150px"}}>
                                                <div className="card-body d-flex flex-column justify-content-between h-100">
                                                    <div>
                                                        <h5 className="card-title fw-bold text-truncate">
                                                            {v.menu_name}
                                                        </h5>
                                                        <p className="card-text">{v.price}원</p>
                                                    </div>
                                                    <p className="card-text">
                                                        {v.tag.map(w => <a className="me-2" key={w}>#{w}</a>)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-footer">
                                            <button className="btn btn-danger w-100"
                                                    onClick={() => removeMenu(v.menu_id)}>삭제
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ,)}

                        {/* 메뉴 추가 폼 */}
                        {newMenu.map(v =>
                                <div className="col" key={v.idx}>
                                    <div className="card shadow p-3 align-items-end">
                                        <button className="btn btn-sm btn-outline-danger mb-1" value={v.idx}
                                                onClick={deleteNewMenu}>삭제
                                        </button>
                                        <div className="input-group mb-1 input-group-sm">
                                            <span className="input-group-text" id={"menu" + v.idx}>메뉴</span>
                                            <input type="text" className="form-control" name={v.idx}
                                                   placeholder="메뉴명을 입력하세요." value={v.menu_name}
                                                   onChange={handleMenu}/>
                                        </div>
                                        <div className="input-group mb-1 input-group-sm">
                                            <span className="input-group-text" id={"price" + v.idx}>가격</span>
                                            <input type="number" className="form-control" name={v.idx}
                                                   placeholder="가격을 입력하세요." value={v.price}
                                                   onChange={handlePrice}/>
                                        </div>
                                        <div className="d-flex w-100 align-items-center">
                                            <AddTags idx={v.idx} newMenu={newMenu} setNewMenu={setNewMenu}/>
                                            <div className="">
                                                {v.tag.map(w => <a className="me-1" key={w}> #{w} </a>)}
                                            </div>
                                        </div>
                                        <div className="d-flex w-100 align-items-center">
                                            <label htmlFor={v.idx}>
                                                <div className="btn btn-sm btn-outline-primary">사진 선택</div>
                                            </label>
                                            <input type="file" name={v.idx} id={v.idx} className="d-none"
                                                   onChange={handleImg}/>
                                            <div className="ms-2">{v.img.name}</div>
                                        </div>
                                    </div>
                                </div>
                            ,)}

                        {/* 메뉴 추가 버튼 */}
                        <div className="col">
                            <div className="card shadow" style={{minHeight: "150px", minWidth: "250px"}}>
                                <div className="d-flex justify-content-center align-items-center"
                                     style={{minHeight: "150px"}}>
                                    <a className="stretched-link" onClick={() => {
                                        setNewMenu([...newMenu, {idx, menu_name: "", price: "", tag: [], img: ""}]);
                                        setIdx(idx + 1);
                                    }}>
                                        <i className="bi bi-plus-circle fs-2"/>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-end w-100">
                <button className="btn btn-danger m-3" onClick={() => removeStore(storeId)}>가게 삭제하기</button>
                <button className="btn btn-outline-primary m-3" onClick={submitChange}>변경사항 저장하기</button>
            </div>
        </div>
    );
}

export default AdminStore;