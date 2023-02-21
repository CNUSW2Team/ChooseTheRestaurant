import axios from "axios";
import React, {useEffect, useState} from "react";
import {createFuzzyMatcher} from "../../util/util";

function Menus(props) {

    const [menu, setMenu] = useState([]);
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

    return (
        // <div className="d-flex justify-content-center m-4">
        //     <table className="table table-hover text-center align-middle">
        //         <thead>
        //         <tr>
        //             <th>번호</th>
        //             <th>사진</th>
        //             <th>메뉴</th>
        //             <th>가격</th>
        //             <th>태그</th>
        //         </tr>
        //         </thead>
        //         <tbody>
        //         {menu && menu.map(v => <tr>
        //             <td>{v.idx}</td>
        //             <td><img width={100} src={`/image/${v.menu_id}`}/></td>
        //             <td>{v.menu_name}</td>
        //             <td>{v.price}원</td>
        //             <td>{v.tag.map(w => <button className="btn btn-sm btn-primary rounded-4 me-2">#{w}</button>)}</td>
        //         </tr>,)}
        //         </tbody>
        //     </table>
        <div className="row row-cols-1 row-cols-xl-2 row-cols-xxl-3 g-4 w-100 m-auto">
            {menu.map(v =>
                        <div className="col">
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
                                                {v.tag.map(w => <a className="me-2">#{w}</a>)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ,)}
        </div>
        // </div>


        // <table className={styles.table} style={{width:"620px"}}>
        //     <thead className={styles.thead}>
        //     <tr>
        //         <th className={styles.th}>메뉴명</th>
        //         <th className={styles.th}>가격</th>
        //     </tr>
        //     </thead>
        //     <tbody>
        //     {menu && menu.map(v => <tr>
        //         <td className={styles.td}>{v.menu_name}</td>
        //         <td className={styles.td}>{v.price}</td>
        //     </tr>,)}
        //     </tbody>
        // </table>
    );
}

export default Menus;

