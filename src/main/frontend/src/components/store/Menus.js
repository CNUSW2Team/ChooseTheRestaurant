import axios from "axios";
import React, {useEffect, useState} from "react";

function Menus(props) {

    const [menu, setMenu] = useState([]);
    useEffect(() => {
        axios.get(`/Menu/${props.store}`)
            .then(response => {
                setMenu(response.data);
                console.log("Menu: ", response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    return (
        <div>
            <div>
                <div>
                    <div>메뉴</div>
                </div>
                <div>
                    <table>
                        <thead>
                        <tr>
                            <th>번호</th>
                            <th>사진</th>
                            <th>메뉴</th>
                            <th>가격</th>
                        </tr>
                        </thead>
                        <tbody>
                        {menu && menu.map(v => <tr>
                            <td >0</td>
                            <td ><img width={100} src={`/image/${v.menu_id}`} /></td>
                            <td >{v.menu_name}</td>
                            <td >{v.price}원</td>
                        </tr>,)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>


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

