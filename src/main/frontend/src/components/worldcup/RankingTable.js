import axios from "axios";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Table} from "react-bootstrap";
import styles from "../store/menus.module.css"

function RankingTable(props) {
    let count = 1;
    const [ranking, setRanking] = useState([]);
    useEffect(() => {
        axios.get(`/Ranking/${props.category}`)
            .then(response => {
                setRanking(response.data);
                props.setStore(response.data)
                console.log("Ranking: ", response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    return (
        <div style={{overflow: "scroll", height:"100vh", backgroundColor:"blue"}}>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th className={styles.thead}>순위</th>
                    <th className={styles.thead}>사진</th>
                    <th className={styles.thead}>이름</th>
                    <th className={styles.thead}>별점</th>
                    <th className={styles.thead}>승리</th>
                    <th className={styles.thead}>상세정보</th>
                </tr>
                </thead>
                <tbody className={styles.body}>

                {ranking.map(v =>
                    <tr key={v.store_id}>
                        <td className={styles.td}>{count++}</td>
                        <td className={styles.td}><img width={100} src={`/image/${v.store_id}`} /></td>

                        <td className={styles.td}>{v.store_name}</td>
                        <td className={styles.td}>{v.stars}</td>
                        <td className={styles.td}>{v.winningCount}</td>
                        <td className={styles.td}><Link to={`/Store/${v.store_id}`}> 상세정보 </Link></td>
                    </tr>,
                )}
                </tbody>
            </Table>
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

export default RankingTable;

