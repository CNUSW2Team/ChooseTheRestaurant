import styles from "./reviews.module.css"
import {Rating} from "@mui/material";
import React, {useEffect, useState} from "react";
import Pagination from 'react-js-pagination'
import styled from 'styled-components'
import {createFuzzyMatcher} from "../../util/util";
import SmallReply from "./SmallReply";
import buttonStyle from "../button.module.css";
import axios from "axios";
import PaginationBox from "../../util/PaginationBox";

function Reviews(props) {

    const [review, setReview] = useState([]);
    useEffect(() => {
        axios.get(`/Review/${props.store}`)
            .then(response => {
                setReview(response.data);
                console.log("Review: ", response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    const [searchBox, setSearchBox] = useState('');
    const updateSearchBox = e => setSearchBox(e.target.value);
    useEffect(() => {
        setData(review.filter(v => createFuzzyMatcher(searchBox).test(v.comment.toLowerCase())));
    }, [searchBox, review])
    const [page, setPage] = useState(1);
    const [items, setItems] = useState(5);
    const [data, setData] = useState(review);

    useEffect(() => {
        setTotalCount(data.length);
        setPage(1);
    }, [data])
    const [totalCount, setTotalCount] = useState(data.length - 1);
    const handlePageChange = (page) => {
        setPage(page);
    };

    return (
        <div style={{width: "100%"}}>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <div style={{fontSize: "25px",color: "#754878", padding:"13px"}}>리뷰</div>
                    <div className="flex" style={{marginBottom: "10px"}}>
                        <input className={styles.input} id={"searchArea"} value={searchBox} onChange={updateSearchBox}
                               placeholder={"검색할 내용을 입력하세요."} size={50}/>
                        <button className={buttonStyle.button} type={"button"} onClick={() => {
                            setSearchBox('')
                        }}>초기화
                        </button>
                </div>
                    </div>
                    <table style={{tableLayout: "fixed"}}>
                        <colgroup>
                            <col style={{width: "50px"}}/>
                            <col style={{minWidth: "500px"}}/>
                            <col style={{width: "100px"}}/>
                            <col style={{width: "150px"}}/>
                            <col style={{width: "100px"}}/>
                        </colgroup>
                        <thead>
                        <tr>
                            <th>번호</th>
                            <th>내용</th>
                            <th>별점</th>
                            <th>작성자</th>
                            <th>날짜</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data && totalCount === 0 ?
                            <tr>
                                <td colSpan={5}> 검색된 데이터가 없습니다.</td>
                            </tr>
                            : data.slice(items * (page - 1), items * (page - 1) + items)
                                .map(v => <tr key={v.idx} style={{height: "5px"}}>
                                    <td>{v.idx}</td>
                                    <td style={{height:"45px"}}>
                                        <div className={styles.comment}>
                                            {/*<p>{v.comment}</p>*/}
                                            {v.comment}
                                        </div>
                                    </td>
                                    <td><Rating readOnly precision={0.5} value={v.stars} size={"small"}/></td>
                                    <td>{v.nickname}</td>
                                    <td>{v.date}</td>
                                </tr>,)}
                        </tbody>
                    </table>
                <div>
                    <PaginationBox>
                        <Pagination
                            activePage={page}
                            itemsCountPerPage={items}
                            totalItemsCount={totalCount}
                            pageRangeDisplayed={5}
                            onChange={handlePageChange}>
                        </Pagination>
                    </PaginationBox>
                    <SmallReply store={props.store} setReview={setReview}/>
                </div>

            </div>
        </div>
    );
}

export default Reviews;