import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Form, Table} from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import StartButton from "../StartButton";
import {Container, BeutyButton} from './style';

function WinnerResult(){
    let { categoryId } = useParams();
    let { storeId } = useParams();

    const [results, setResults] = useState([]);
    const [comments, setComments] = useState([]);
    useEffect(() => {
            axios.get(`/Result/${categoryId}/${storeId}`)
                .then(response => {
                    setResults(response.data);
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                })
        },
        []);

    useEffect(() => {
            axios.get(`/Comment/${storeId}`)
                .then(response => {
                    setComments(response.data);
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                })
        },
        []);

    // 내가 남기는 간단 코멘트
    const [NewComment, setComment] = useState('');

    const updateNewComment = e => {
        setComment(e.target.value)
    }

    function Send(e){
        e.preventDefault();
        console.log(NewComment);
        axios.post('/admin/requestStoreAdd',
            {NewComment:NewComment})
        setComment('')
    }


    return (
        <div className="m-5">
            <h4 className="mb-5 p-2">월드컵 진행 결과</h4>
            <div className="inlineBlock">
                <p>{results["comments"]}</p>
                <img width="50%" src={`/image/${storeId}`} />
                <table className="table table-hover table-sm text-center w-50">
                    <caption className="caption caption-top">클릭시 상세정보를 확인 할 수 있습니다.</caption>
                    <thead className="table-dark">
                    <tr>
                        <th >코멘트</th>
                    </tr>-
                    </thead>
                    <tbody>
                    
                    </tbody>
                </table>
            </div>
            <div className="inlineBlock">
                <p>{`${results["store_name"]}는 전체 랭킹에서 ${results["rank"]}등을 차지했어요!`}</p>
                <p>{`별점 ${results["stars"]}`}</p>
                <h5 className="me-3">{`내가 남기는 ${results["store_name"]} 간단 코멘트`}</h5>
                <div className="d-flex">
                    <input className="form-control w-50" onChange={updateNewComment}/>
                    <button className="btn btn-outline-secondary" type={"button"}>등록하기
                    </button>
                </div>
            </div>
            <div className='button-wrap'>
                <button className="btn btn-outline-primary" onClick={() => window.location.href =`/Ranking/${categoryId}`}> 랭킹페이지로 가기</button>
                <StartButton value={"다시하기"} category_name={""} category_id={categoryId} />
                <button className="btn btn-outline-primary" onClick={() => window.location.href =`/AllCategory`}> 다른월드컵 해보기</button>
            </div>
        <div>
        </div>
        </div>
    )
}

export default WinnerResult;

