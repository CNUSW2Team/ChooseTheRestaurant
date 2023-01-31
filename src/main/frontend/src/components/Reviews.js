import styles from "./reviews.module.css"
import {Rating} from "@mui/material";

function Reviews(props) {
    return (
        <div style={{width:"100%"}}>
            <div className={styles.wrapper}>
                <div style={{fontSize:"25px"}}>리뷰</div>
                <div>
                    <div>검색창</div>
                    <table className={styles.table}>
                        <thead className={styles.thead}>
                        <tr>
                            <th className={styles.th} style={{width:"30px"}}>번호</th>
                            <th className={styles.th} style={{width:"650px"}}>내용</th>
                            <th className={styles.th} style={{width:"80px"}}>별점</th>
                            <th className={styles.th} style={{width:"80px"}}>작성자</th>
                            <th className={styles.th} style={{width:"100px"}}>날짜</th>
                        </tr>
                        </thead>
                        <tbody className={styles.tbody}>
                        {props.reviews && props.reviews.sort((a, b) => (new Date(b.date) - new Date(a.date))).map(v => <tr>
                            <td className={styles.td}>0</td>
                            <td className={styles.td} style={{overflow:"hidden"}}>{v.comment}</td>
                            <td className={styles.td} style={{justifyContent:"space-evenly"}}><Rating readOnly defaultValue={v.stars} size={"small"}/></td>
                            <td className={styles.td}>{v.nickname}</td>
                            <td className={styles.td}>{v.date}</td>
                        </tr>,)}
                        </tbody>
                    </table>
                    {/*{props.reviews && props.reviews.sort((a, b) => (new Date(b.date) - new Date(a.date))).map(v =>*/}
                    {/*    <Review nickname={v.nickname} date={v.date} stars={v.stars} comment={v.comment}/>)*/}
                    {/*}*/}
                    <div style={{display:"flex", justifyContent:"center"}}>페이지 넘기기</div>
                </div>

                <div style={{display:"flex", justifyContent:"right"}}><button onClick={() => props.onClickHandler(3)}>리뷰남기기</button></div>
            </div>
        </div>
);
}

export default Reviews;