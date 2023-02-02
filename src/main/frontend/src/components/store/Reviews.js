import styles from "./reviews.module.css"
import {Rating} from "@mui/material";
import React, {useEffect, useState} from "react";
import Pagination from 'react-js-pagination'
import styled from 'styled-components'
import {createFuzzyMatcher} from "../../util/util";
import SmallReply from "./SmallReply";
import buttonStyle from "../button.module.css";
import axios from "axios";

function Reviews(props) {

    const [review, setReview] = useState([]);
    useEffect(() => {
        axios.get(`/Review/${props.store}`)
            .then(response => {
                setReview(response.data);
                console.log("Review: ",response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    const [searchBox, setSearchBox] = useState('');
    const updateSearchBox = e => setSearchBox(e.target.value);
    useEffect(() => {
        setData(review.filter(v => createFuzzyMatcher(searchBox).test(v.comment)));
    }, [searchBox, review])
    const [page, setPage] = useState(1);
    const [items, setItems] = useState(5);
    const [data, setData] = useState(review);

    useEffect(() => {
        setTotalCount(data.length);
        setPage(1);
    }, [data])
    const [totalCount, setTotalCount] = useState(data.length-1);
    const handlePageChange = (page) => { setPage(page); };

    return (
        <div style={{width:"100%"}}>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <div style={{fontSize:"25px", padding:"10px", color:"#754878"}}>리뷰</div>
                    <div style={{display:"flex"}}>
                        <input className={styles.input} id={"searchArea"} value={searchBox} onChange={updateSearchBox}
                               placeholder={"검색할 내용을 입력하세요."} size={50}/>
                        <button className={buttonStyle.button} type={"button"} onClick={() => {setSearchBox('')}}>초기화</button>
                    </div>

                </div>

                <div>

                    <table className={styles.table}>
                        <thead className={styles.thead}>
                        <tr>
                            <th className={styles.th} style={{width:"30px"}}>번호</th>
                            <th className={styles.th} style={{width:"600px"}}>내용</th>
                            <th className={styles.th} style={{width:"80px"}}>별점</th>
                            <th className={styles.th} style={{width:"80px"}}>작성자</th>
                            <th className={styles.th} style={{width:"100px"}}>날짜</th>
                        </tr>
                        </thead>
                        <tbody className={styles.tbody}>
                        {data && totalCount === 0 ?
                            <tr>
                                <td className={styles.td} colSpan={5}> 검색된 데이터가 없습니다. </td>
                            </tr>
                            : data.slice(items*(page-1), items*(page-1)+items)
                            .map(v => <tr key={v.idx}>
                                <td className={styles.td}>{v.idx}</td>
                                <td className={styles.td} style={{overflow:"hidden"}}>{v.comment}</td>
                                <td className={styles.td} style={{justifyContent:"space-evenly"}}><Rating readOnly precision={0.5} value={v.stars} size={"small"}/></td>
                                <td className={styles.td}>{v.nickname}</td>
                                <td className={styles.td}>{v.date}</td>
                            </tr>,)}
                        </tbody>
                    </table>
                    <div> <PaginationBox>
                        <Pagination
                            activePage={page}
                            itemsCountPerPage={items}
                            totalItemsCount={totalCount}
                            pageRangeDisplayed={5}
                            onChange={handlePageChange}>
                        </Pagination>
                    </PaginationBox> </div>
                </div>
                <div> <SmallReply store={props.store} setReview={setReview}/> </div>
            </div>
        </div>
);
}

const PaginationBox = styled.div`
  .pagination { display: flex; justify-content: center; margin-top: 15px;}
  ul { list-style: none; padding: 0; }
  ul.pagination li {
    display: inline-block;
    width: 30px;
    height: 30px;
    border: 1px solid #e2e2e2;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem; 
  }
  ul.pagination li:first-child{ border-radius: 5px 0 0 5px; }
  ul.pagination li:last-child{ border-radius: 0 5px 5px 0; }
  ul.pagination li a { text-decoration: none; color: #9f9f9f; font-size: 1rem; }
  ul.pagination li.active a { color: white; }
  ul.pagination li.active { background-color: #754878; }
  ul.pagination li a:hover,
  ul.pagination li a.active { color: #e7ddf7; }
`

export default Reviews;