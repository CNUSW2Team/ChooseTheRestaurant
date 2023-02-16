import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Form, Table} from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import StartButton from "../StartButton";
import {Container, BeutyButton} from './style';

function WinnerResult() {
    let {categoryId} = useParams();
    let {storeId} = useParams();

    const [store, setStore] = useState([]);
    const [comments, setComments] = useState([]);
    const [favorite, setFavorite] = useState(false);
    useEffect(() => {
            axios.get(`/api/Ranking/${categoryId}/${storeId}`)
                .then(response => {
                    setStore(response.data);
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
            axios.get(`/api/Comment/${storeId}`)
                .then(response => {
                    setComments(response.data);
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        []);

    // 내가 남기는 간단 코멘트
    const [newComment, setNewComment] = useState('');
    const updateComment = e => {
        setNewComment(e.target.value)
    }

    function addReview() {
        if (newComment.length > 20) {
            alert('코멘트는 20자 까지만 가능합니다.\n더 자세한 내용은 가게 리뷰에 남겨주세요.');
        } else {
            const fd = new FormData();
            fd.append("comments", newComment);

            axios.post(`/api/Comment/${storeId}`, fd)
                .then((response) => {
                    alert(response.data);
                })
                .then(() => {
                    axios.get(`/api/Comment/${storeId}`)
                        .then(response => {
                            setComments(response.data);
                            console.log(response.data);
                            setNewComment('');
                        })
                        .catch(error => {
                            console.log(error);
                        })
                })
        }
    }

    function updateFavorite() {
        if (favorite) {
            // favorite 감소

        } else {
            // favorite 증가

        }
    }


    return (
        <div className="m-5">
            <h4 className="mb-5 p-2">월드컵 진행 결과</h4>
            <div className="d-flex justify-content-evenly">
                <img width="40%" src={`/image/${storeId}`}/>
                <table className="table table-hover table-sm text-center w-50">
                    <caption className="caption caption-top">간단 코멘트</caption>
                    <thead className="table-dark">
                    <tr>
                        <th >코멘트</th>
                    </tr>
                    </thead>
                    <tbody>
                    {comments.map(v =>
                        <tr key={v.comment_id}>
                            <td>{v.comment}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
            <div className="inlineBlock">
                <p>{`${store["store_name"]}는 전체 랭킹에서 ${store["rank"]}등을 차지했어요!`}</p>
                <p>{`별점 ${store["stars"]}`}</p>
                <h5 className="me-3">{`내가 남기는 ${store["store_name"]} 간단 코멘트`}</h5>
                <div className="d-flex">
                    <input className="form-control w-50" onChange={updateComment} value={newComment}/>
                    <button className="btn btn-outline-secondary" type={"button"} onClick={addReview}>등록하기

                    </button>
                </div>
            </div>
            <div className='button-wrap'>
                <button className="btn btn-outline-primary"
                        onClick={() => window.location.href = `/Ranking/${categoryId}`}> 랭킹페이지로 가기
                </button>
                <StartButton value={"다시하기"} category_name={""} category_id={categoryId}/>
                <button className="btn btn-outline-primary" onClick={() => window.location.href = `/AllCategory`}> 다른월드컵
                    해보기
                </button>
                <button className="btn btn-outline-danger" onClick={updateFavorite}> 좋아요♥
                </button>
            </div>
            <div>
            </div>
        </div>
    )
}

export default WinnerResult;

