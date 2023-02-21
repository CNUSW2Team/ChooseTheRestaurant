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

    return (
        <div className="row row-cols-lg-1 row-cols-xl-2 row-cols-xxl-3 g-4 w-100 m-auto">
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
                                            <h5 className="card-title fw-bold text-truncate w-100">{v.menu_name}</h5>
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

            {newMenu.map(v =>
                    <div className="col">
                        <div className="card shadow p-3">
                            <div className="input-group mb-1 input-group-sm">
                                <span className="input-group-text" id={"menu" + v.idx}>메뉴</span>
                                <input type="text" className="form-control" placeholder="메뉴명을 입력하세요."
                                />
                            </div>
                            <div className="input-group mb-1 input-group-sm">
                                <span className="input-group-text" id={"price" + v.idx}>가격</span>
                                <input type="text" className="form-control" placeholder="가격을 입력하세요."/>
                            </div>
                            <div className="input-group mb-1 input-group-sm">
                                <span className="input-group-text" id={"tag" + v.idx}>태그</span>
                                <input type="text" className="form-control" placeholder="태그를 입력하세요."/>
                            </div>
                            <div className="input-group input-group-sm">
                                <input type="file" className="form-control"/>
                            </div>
                        </div>
                    </div>
                ,)}

            <div className="col">
                <div className="card shadow">
                    <div className="d-flex justify-content-center align-items-center" style={{minHeight: "150px"}}>
                        <a className="" onClick={() => {
                            setNewMenu([...newMenu, {idx, menu_name:"", price:0, tag:[], img:""}]);
                            setIdx(idx+1);
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

