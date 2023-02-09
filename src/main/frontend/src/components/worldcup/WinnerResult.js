import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Form, Table} from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import StartButton from "../StartButton";

function WinnerResult(){
    let { categoryId } = useParams();
    let { storeId } = useParams();

    const [StoreInfo, setData] = useState([]);
    useEffect(() => {
            axios.get(`/Result/${categoryId}/${storeId}`)
                .then(response => {
                    setData(response.data);
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
        axios.post('http://localhost:8080/admin/requestStoreAdd',
            {NewComment:NewComment})
        setComment('')
    }


    return (
        <>
            <div className="inlineBlock">
                <p>{StoreInfo["comments"]}</p>
                <img width={500} src={`/image/${storeId}`} />
            </div>
            <div className="inlineBlock">
                <p>{`${StoreInfo["store_name"]}는 전체 랭킹에서 ${StoreInfo["rank"]}등을 차지했어요!`}</p>
                <p>{`별점 ${StoreInfo["stars"]}`}</p>
                <form onSubmit={Send}>
                    <h4 className='inlineBlock'>{`내가 남기는 ${StoreInfo["store_name"]} 간단 코멘트`}</h4>
                    <input onChange={updateNewComment} value={NewComment} placeholder="write your comment"/>
                    <Button>sfsfds</Button>
                </form>
            </div>
            <div className='button-wrap'>
                <button className="btn btn-outline-primary" onClick={() => window.location.href =`/Ranking/${categoryId}`}> 랭킹페이지로 가기</button>
                <StartButton value={"다시하기"} category_name={""} category_id={categoryId} />
                <button className="btn btn-outline-primary" onClick={() => window.location.href =`/AllCategory`}> 다른월드컵 해보기</button>
            </div>
        <div>

        </div>
        </>
    )
}

export default WinnerResult;

