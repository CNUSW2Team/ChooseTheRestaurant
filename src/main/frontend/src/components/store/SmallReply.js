import {Rating} from "@mui/material";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {AiFillMessage} from "react-icons/ai";
import styles from "./smallreply.module.css"
import buttonStyle from "../button.module.css"

function SmallReply(props) {
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
            console.log(password);
            alert('비밀번호를 입력해 주세요.');
        } else if (rating === 0) {
            alert('별점을 메겨주세요.');
        } else if (comment.length < 1) {
            alert('리뷰를 적어주세요.');
        } else if(comment.length > 200){
            alert('리뷰는 200자 까지만 가능합니다.');
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
                    axios.get(`/Review/${props.store}`)
                        .then(response => {
                            props.setReview(response.data);
                            console.log(response.data);
                            setComment('');


                        })
                        .catch(error => {
                            console.log(error);
                        })
                })
        }
    }

    return (<div className={styles.wrapper}>
        <div className={styles.inputArea}>
            <AiFillMessage size={25} style={{paddingRight: "5px", color:"#754878"}}/>
            <textarea value={comment} onChange={updateComment} className={styles.textarea}
                      placeholder="리뷰를 남겨주세요"></textarea>
        </div>
        <div className={styles.reply}>
            <div className={styles.rating}>
                <Rating precision={0.5} defaultValue={5} onChange={updateRating} size={"small"}/>
                <div style={{width:"40px", padding:"2px"}}>{rating}점</div>
            </div>
            <button className={buttonStyle.button} type="button" onClick={addReview}>
                리뷰 남기기
            </button>
        </div>
    </div>);
}

export default SmallReply;

