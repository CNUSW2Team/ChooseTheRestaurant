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
        axios.post('/admin/requestStoreAdd',
            {NewComment:NewComment})
        setComment('')
    }


    return (
        <div style={{position:"absolute", top:"53%", left:"65%", transform:"translate(-50%,-50%)", display:"flex", width:"80vw"}}>
            <div>
                <img width={600} src={`/image/${storeId}`} />
                {/* <p>{StoreInfo["comments"]}</p> 작성된 코멘트 뿌리는 부분*/}
            </div>
            <div style={{display:"flex", alignItems:"center", flexDirection:"column"}}>
                <p>{`${StoreInfo["store_name"]}는 전체 랭킹에서 ${StoreInfo["rank"]}등을 차지했어요!`}</p>
                <p>{`별점 ${StoreInfo["stars"]}`}</p>
                <form onSubmit={Send}>
                    <h4 className='inlineBlock'>{`내가 남기는 ${StoreInfo["store_name"]} 간단 코멘트`}</h4>
                    <input onChange={updateNewComment} value={NewComment} placeholder="write your comment"/> 
                    <button type="submit">멘트</button>
                </form>
                <div className='button-wrap'>
                    <button className="btn btn-outline-primary" onClick={() => window.location.href =`/Ranking/${categoryId}`}> 랭킹페이지로 가기</button>
                    <StartButton value={"다시하기"} category_name={""} category_id={categoryId} />
                    <button className="btn btn-outline-primary" onClick={() => window.location.href =`/AllCategory`}> 다른월드컵 해보기</button>
                </div>
            </div>
            
        </div>
    )
}

export default WinnerResult;

