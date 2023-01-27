import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {Table} from "react-bootstrap";
import styles from "./table.module.css"
import { Rating } from '@mui/material';

function Store() {
    let {storeId} = useParams();
    const [store, setData] = useState([]);
    const [nickName, setNickName] = useState('익명');
    const [password, setPassword] = useState('');
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);

    const updateNickName = e => setNickName(e.target.value);
    const updatePasswords = e => setPassword(e.target.value);
    const updateComment = e => setComment(e.target.value);
    const updateRating = e => {setRating(e.target.value); console.log(rating)}

    useEffect(() => {
        axios.get(`/StoreInfo/${storeId}`)
            .then(response => {
                setData(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    function addReview() {
        const fd = new FormData();

        if (password.length < 1) {
            alert('비밀번호를 입력해 주세요.');
        } else if(rating === 0){
            alert('별점을 메겨주세요.');
        } else if(comment.length < 1){
            alert('리뷰를 적어주세요.');
        }
        else {
            const reviewDto = {
                store_id: storeId,
                writer: nickName,
                contents: comment,
                rating: rating,
                password: password
            }

            fd.append("reviewDto", JSON.stringify(reviewDto));

            axios.post('http://localhost:8080/requestReviewAdd', fd)
                .then((response) => {
                    alert(response.data);
                })
                .then(() => {
                    window.location.href = `/Store/${storeId}`;
                })
        }
    }

    return (<div>
            <div style={{display: "flex", justifyContent: "center", margin: "auto"}}>
                <div>
                    <Table className={styles.table}>
                        <thead className={styles.thead}>
                        <tr>
                            <th className={styles.th}>가게이름: {store.store_name}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className={styles.td}><img width={400} src={`/img/${storeId}.jpg`}/></td>
                        </tr>
                        <tr>
                            <td className={styles.td}> 주소: {store.address} </td>
                        </tr>
                        <tr>
                            <td className={styles.td}> 연락처: {store.contact} </td>
                        </tr>
                        <tr>
                            <td className={styles.td}> <Rating name="half-rating-read" value={store.averageStars} precision={0.01} readOnly/> {store.averageStars} </td>
                        </tr>
                        </tbody>
                    </Table>
                </div>
                <div>
                    <Table className={styles.table}>
                        <thead className={styles.thead}>
                        <tr>
                            <th className={styles.th}>요일</th>
                            <th className={styles.th}>시간</th>
                        </tr>
                        </thead>
                        <tbody>
                        {store.times && store.times.map(v => <tr>
                            <td className={styles.td}>{v.day}</td>
                            <td className={styles.td}>{v.hours}</td>
                        </tr>,)}
                        </tbody>
                    </Table>
                </div>
            </div>
            <Table className={styles.table}>
                <thead className={styles.thead}>
                <tr>
                    <th className={styles.th}>메뉴명</th>
                    <th className={styles.th}>가격</th>
                </tr>
                </thead>
                <tbody>
                {store.menu && store.menu.map(v => <tr>
                    <td className={styles.td}>{v.menu_name}</td>
                    <td className={styles.td}>{v.price}</td>
                </tr>,)}
                </tbody>
            </Table>

            <Table className={styles.table}>
                <thead className={styles.thead}>
                <tr>
                    <th className={styles.th}>작성자</th>
                    <th className={styles.th}>시간</th>
                    <th className={styles.th}>별점</th>
                    <th className={styles.th}>내용</th>
                </tr>
                </thead>
                <tbody>
                {store.reviews && store.reviews.sort((a, b) => (new Date(b.date) - new Date(a.date))).map(v => <tr>
                    <td className={styles.td}>{v.nickname}</td>
                    <td className={styles.td}>{v.date}</td>
                    <td className={styles.td}> <Rating name="size-medium" defaultValue={v.stars} readOnly/> {v.stars} </td>
                    <td className={styles.td}>{v.comment}</td>
                </tr>,)}
                </tbody>
            </Table>

            <div>
                <div>
                    <i className="fa fa-comment fa"></i> REPLY
                </div>
                <div>
                    <ul>
                        <li>
                            <div>
                                <label htmlFor="replyId"><i className="fa fa-user-circle-o fa-2x"></i></label>
                                <input type="text" placeholder="익명" onChange={updateNickName}/>
                                <label htmlFor="replyPassword"><i className="fa fa-unlock-alt fa-2x"></i></label>
                                <input type="password" placeholder="패스워드" onChange={updatePasswords}/>
                            </div>
                            <div>
                                <Rating name="size-medium" defaultValue={0} onChange={updateRating}/> {rating}점
                            </div>
                            <textarea onChange={updateComment} style={{width: "50%", height: "6.25em", resize: "none", border: "none"}}
                                      placeholder="리뷰를 남겨주세요"></textarea>
                            <button type="button" onClick={addReview}>
                                post reply
                            </button>
                        </li>
                    </ul>
                </div>
            </div>


        </div>

    );
}

export default Store;