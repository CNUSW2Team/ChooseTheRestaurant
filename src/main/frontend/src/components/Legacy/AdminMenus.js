import axios from "axios";
import React, {useEffect, useState} from "react";

function Menus(props) {

    const [menu, setMenu] = useState([]);
    const [newMenu, setNewMenu] = useState([]);
    const [idx, setIdx] = useState(1);

    useEffect(() => {
        axios.get(`/api/Menu/${props.store}`)
            .then(response => {
                setMenu(response.data);
                console.log("Menu: ", response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    useEffect(() => {
        console.log(newMenu);
    }, [newMenu]);

    function removeMenu(id){
        if (window.confirm("정말로 삭제하시겠습니까?")) {
            axios.delete(`/api/Menu/${id}`)
                .then(() => {
                    axios.get(`/api/Menu/${props.store}`)
                        .then(response => {
                            setMenu(response.data);
                            console.log("Menu: ", response.data);
                        })
                        .catch(error => {
                            console.log(error);
                        })
                })
                .then((response) => {
                    console.log(response.data)
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

    function handleTag(e) {
        const value = e.target.value;
        const name = e.target.name;
        setNewMenu(newMenu.map((item) => {
            return item.idx === parseInt(name) ? {...item, tag: value} : item;
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

    return (
        <div className="row row-cols-1 row-cols-xl-2 row-cols-xxl-3 g-4 w-100 m-auto">
            {/* 등록된 메뉴 */}
            {menu.map(v =>
                    <div className="col">
                        <div className="card shadow">
                            <div className="row">
                                <div className="col-5">
                                    <img src={`/image/${v.menu_id}`} className="rounded-start img-fluid h-100"
                                         style={{objectFit: "cover"}}/>
                                </div>
                                <div className="col" style={{minHeight: "150px"}}>
                                    <div className="card-body d-flex flex-column justify-content-between h-100">
                                        <div>
                                            <h5 className="card-title fw-bold text-truncate w-100 d-flex justify-content-between align-items-center">
                                                {v.menu_name}
                                                <button className="btn btn-danger btn-sm" onClick={() => removeMenu(v.menu_id)}>삭제</button>
                                            </h5>
                                            <p className="card-text">{v.price}원</p>
                                        </div>
                                        <p className="card-text">
                                            {v.tag.map(w => <a className="me-2">#{w}</a>)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ,)}

            {/* 메뉴 추가 폼 */}
            {newMenu.map(v =>
                    <div className="col">
                        <div className="card shadow p-3 align-items-end">
                            <button className="btn btn-sm btn-outline-danger mb-1" value={v.idx} onClick={deleteNewMenu}>삭제</button>
                            <div className="input-group mb-1 input-group-sm">
                                <span className="input-group-text" id={"menu" + v.idx}>메뉴</span>
                                <input type="text" className="form-control" name={v.idx} placeholder="메뉴명을 입력하세요." value={v.menu_name}
                                       onChange={handleMenu}/>
                            </div>
                            <div className="input-group mb-1 input-group-sm">
                                <span className="input-group-text" id={"price" + v.idx}>가격</span>
                                <input type="text" className="form-control" name={v.idx} placeholder="가격을 입력하세요." value={v.price}
                                       onChange={handlePrice}/>
                            </div>
                            <div className="input-group mb-1 input-group-sm">
                                <span className="input-group-text" id={"tag" + v.idx}>태그</span>
                                <input type="text" className="form-control" name={v.idx} placeholder="태그를 입력하세요. '/'로 구분합니다." value={v.tag}
                                       onChange={handleTag}/>
                            </div>
                            <div  className="d-flex w-100 align-items-center">
                                <label htmlFor={v.idx}>
                                    <div className="btn btn-sm btn-outline-primary">사진 선택</div>
                                </label>
                                <input type="file" name={v.idx} id={v.idx} className="d-none" onChange={handleImg}/>
                                <div className="ms-2">{v.img.name}</div>
                            </div>
                        </div>
                    </div>
                ,)}

            {/* 메뉴 추가 버튼 */}
            <div className="col">
                <div className="card shadow">
                    <div className="d-flex justify-content-center align-items-center" style={{minHeight: "150px"}}>
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
    );
}

export default Menus;

