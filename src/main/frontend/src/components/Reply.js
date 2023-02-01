import {Rating} from "@mui/material";
import React, {useState} from "react";
import axios from "axios";
import {AiFillMessage} from "react-icons/ai";
import {RiLockPasswordFill} from "react-icons/ri";
import {FaUserCircle} from "react-icons/fa";
import {Button} from 'react-bootstrap';
import styles from "./reply.module.css"

function Reply(props) {
    const [nickName, setNickName] = useState('익명');
    const [password, setPassword] = useState('default');
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState('5.0');

    const updateNickName = e => setNickName(e.target.value);
    const updatePasswords = e => setPassword(e.target.value);
    const updateComment = e => setComment(e.target.value);
    const updateRating = e => {
        setRating(e.target.value);
    }

    function addReview() {
        const fd = new FormData();

        if (password.length < 1) {
            alert('비밀번호를 입력해 주세요.');
        } else if (rating === 0) {
            alert('별점을 메겨주세요.');
        } else if (comment.length < 1) {
            alert('리뷰를 적어주세요.');
        } else {
            const reviewDto = {
                store_id: props.store, writer: nickName, contents: comment, rating: rating, password: password
            }

            fd.append("reviewDto", JSON.stringify(reviewDto));

            axios.post('http://localhost:8080/requestReviewAdd', fd)
                .then((response) => {
                    alert(response.data);
                })
                .then(() => {
                    window.location.href = `/Store/${props.store}`;
                })
        }
    }

    return (<div className={styles.card}>
        <div className={styles.cardHeader}>
            <AiFillMessage size={25} style={{paddingRight: "5px"}}/>REPLY
        </div>
        <div className={styles.cardBody}>
            <ul style={{padding: "0px 0px 0px 10px", marginTop: "8px"}}>
                <li className={styles.li} style={{marginBottom: "3px"}}>
                    <div className={styles.form1}>
                        <div className={styles.user}>
                            <FaUserCircle size={25}/>
                            <input style={{marginRight:"15px", marginLeft:"10px"}} type="text" placeholder="익명" onChange={updateNickName}/>
                            <RiLockPasswordFill size={25}/>
                            <input style={{marginRight:"15px", marginLeft:"10px"}} type="password" placeholder="패스워드" onChange={updatePasswords}/>
                        </div>

                        <div className={styles.form2}>
                            <Rating name="Create_Review" defaultValue={rating} precision={0.5} onChange={updateRating}/>
                            {rating}점
                        </div>
                    </div>
                    <div className={styles.form3}><textarea onChange={updateComment} className={styles.textarea}
                                                            placeholder="리뷰를 남겨주세요"></textarea>
                        <Button type="button" onClick={addReview}>
                            리뷰 남기기
                        </Button></div>

                </li>
            </ul>
        </div>
    </div>);
}

export default Reply;

