import {Rating} from "@mui/material";
import React, {useState} from "react";
import axios from "axios";
import {AiFillMessage} from "react-icons/ai";
import {RiLockPasswordFill} from "react-icons/ri";
import {FaUserCircle} from "react-icons/fa";
import {Button} from 'react-bootstrap';

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

    return (<div>
        <div>
            <AiFillMessage size={25}/>REPLY
        </div>
        <div>
            <ul>
                <li>
                    <div>
                        <div>
                            <FaUserCircle size={25}/>
                            <input type="text" placeholder="익명" onChange={updateNickName}/>
                            <RiLockPasswordFill size={25}/>
                            <input type="password" placeholder="패스워드" onChange={updatePasswords}/>
                        </div>

                        <div>
                            <Rating name="Create_Review" defaultValue={rating} precision={0.5} onChange={updateRating}/>
                            {rating}점
                        </div>
                    </div>
                    <div><textarea onChange={updateComment}
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

