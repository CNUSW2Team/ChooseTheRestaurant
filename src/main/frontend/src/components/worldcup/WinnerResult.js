import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import StartButton from "./StartButton";

function WinnerResult() {
    let {categoryId} = useParams();
    let {storeId} = useParams();

    const [store, setStore] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [numOfStore, setNumOfStore] = useState(0);
    const [likeNum, setLikeNum] = useState(0);
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
            axios.get(`/api/Category/${categoryId}`)
                .then(response => {
                    setLikeNum(response.data.favorite);
                    setCategoryName(response.data.category_name);
                    setNumOfStore(response.data.num_of_stores);
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
                    setComments([...comments, {"comment": newComment, "comment_id": comments.length + 1}])
                    setNewComment('')
                })

        }
    }

    function updateFavorite() {
        if (favorite) {
            // favorite 감소
            setLikeNum(likeNum-1);
            axios.put(`/api/Favorite/${categoryId}/decrease`)
                .catch(error => {
                    console.log(error);
                });
        } else {
            // favorite 증가
            setLikeNum(likeNum+1);
            axios.put(`/api/Favorite/${categoryId}/increase`)
                .catch(error => {
                    console.log(error);
                });
        }
        setFavorite(!favorite);
    }

    return (
        <div className="m-5">
            <h4 className="mb-5 p-2">월드컵 진행 결과</h4>
            <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 justify-content-evenly">
                <div className="col text-center">
                    <img className="w-100" src={`/image/${storeId}`}/>
                    <p className="fw-bold">{`${store["store_name"]}는 전체 랭킹에서 ${store["rank"]}등을 차지했어요!`}</p>
                    <p>{`별점 ${store["stars"]}`}</p>
                </div>
                <div className="col">
                    <table className="table table-hover table-sm text-center">
                        <caption className="caption caption-top">간단 코멘트</caption>
                        <thead className="table-dark">
                        <tr>
                            <th>코멘트</th>
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
            </div>
            <div className="m-5">
                <h5 className="me-3">{`내가 남기는 ${store["store_name"]} 간단 코멘트`}</h5>
                <div className="d-flex mb-2">
                    <input className="form-control w-50" onChange={updateComment} value={newComment}/>
                    <button className="btn btn-outline-secondary" type={"button"} onClick={addReview}>등록하기
                    </button>
                </div>
                <div className='button-wrap'>
                    <button className="btn btn-outline-primary me-1"
                            onClick={() => window.location.href = `/Ranking/${categoryId}`}> 랭킹페이지로 가기
                    </button>
                    <StartButton value={"다시하기"} category_name={categoryName} category_id={categoryId} num_of_stores={numOfStore}/>
                    <button className="btn btn-outline-primary mx-1"
                            onClick={() => window.location.href = `/AllCategory`}> 다른월드컵
                        해보기
                    </button>
                    <button
                        className={"btn rounded-5 " + (favorite ? "btn-danger" : "btn-outline-danger")}
                        onClick={updateFavorite}> 월드컵 추천 ♥{likeNum}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default WinnerResult;

