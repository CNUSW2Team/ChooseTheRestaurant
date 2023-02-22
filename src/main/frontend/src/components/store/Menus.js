import axios from "axios";
import React, {useEffect, useState} from "react";

function Menus(props) {

    const [menu, setMenu] = useState([]);
    useEffect(() => {
        axios.get(`/api/Menu/${props.store}`)
            .then(response => {
                setMenu(response.data);
                // console.log("Menu: ", response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    return (
        <div className="row row-cols-1 row-cols-xl-2 row-cols-xxl-3 g-4 w-100 m-auto">
            {menu.map(v =>
                        <div className="col"  key={v.menu_id}>
                            <div className="card shadow">
                                <div className="row">
                                    <div className="col-5">
                                        <img src={`/image/${v.menu_id}`} className="rounded-start img-fluid h-100"
                                             style={{objectFit: "cover"}}/>
                                    </div>
                                    <div className="col-7 p-1" style={{minHeight:"150px"}}>
                                        <div className="card-body d-flex flex-column justify-content-between h-100">
                                            <div className="d-flex flex-column">
                                                <h5 className="fw-bold text-truncate">{v.menu_name}</h5>
                                                <p className="card-text">{v.price}원</p>
                                            </div>
                                            <p className="d-flex">
                                                {v.tag.map(w => <a className="me-2" key={w}> #{w} </a>)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ,)}
        </div>
    );
}

export default Menus;

