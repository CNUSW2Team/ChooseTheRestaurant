import styles from "./review.module.css"
import {FaUserCircle} from "react-icons/fa";
import React from "react";
import {Rating} from "@mui/material";

function Review(props) {
    return (
        <div className={styles.form}>
            <table className={styles.table}>
                <tr>
                    <th className={styles.th1}> <FaUserCircle/> {props.nickname}</th>
                    <th className={styles.th2}> {props.date}</th>
                    <th className={styles.th3}> <Rating name="rate" size={"small"} value={props.stars} precision={0.5} readOnly/> {props.stars}점</th>
                </tr>
                <td className={styles.td} colSpan={3}>
                    {props.comment}
                </td>
            </table>
            {/*<ul className={styles.ul}>*/}
            {/*    <li className={styles.li}>*/}
            {/*        <FaUserCircle/> {props.nickname}*/}
            {/*    </li>*/}
            {/*    <li className={styles.li}>*/}
            {/*        {props.date}*/}
            {/*    </li>*/}
            {/*    <li className={styles.li}>*/}
            {/*        <Rating name="rate" size={"small"} value={props.stars} precision={0.5} readOnly/> {props.stars}점*/}
            {/*    </li>*/}
            {/*    <li className={styles.li}>*/}
            {/*        {props.comment}*/}
            {/*    </li>*/}
            {/*</ul>*/}
        </div>


        // <div>
        //     <div>닉네임: {props.nickname}</div>
        //     <div>시간: {props.date}</div>
        //     <div>별점: {props.stars}</div>
        //     <div>코멘트: {props.comment}</div>
        // </div>
        //     <Table className={styles.table}>
        //     <thead className={styles.thead}>
        //     <tr>
        //         <th className={styles.th}>작성자</th>
        //         <th className={styles.th}>시간</th>
        //         <th className={styles.th}>별점</th>
        //         <th className={styles.th}>내용</th>
        //     </tr>
        //     </thead>
        //     <tbody>
        //     {props.reviews && props.reviews.sort((a, b) => (new Date(b.date) - new Date(a.date))).map(v => <tr>
        //         <td className={styles.td}>{v.nickname}</td>
        //         <td className={styles.td}>{v.date}</td>
        //         <td className={styles.td}> <Rating name="Review_Stars" precision={0.5} defaultValue={v.stars} readOnly/> {v.stars} </td>
        //         <td className={styles.td}>{v.comment}</td>
        //     </tr>,)}
        //     </tbody>
        // </Table>
    );
}

export default Review;

