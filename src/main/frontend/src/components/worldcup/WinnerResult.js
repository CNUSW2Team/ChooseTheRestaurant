import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Form, Table} from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import {Container, BeutyButton} from './style';

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
        <Container>
            <div className="inlineBlock">
                <p>{StoreInfo["comments"]}</p>
                <img width={500} src={`/img/${storeId}.jpg`} />
            </div>
            <div className="inlineBlock">
                <p>{`${StoreInfo["store_name"]}는 전체 랭킹에서 ${StoreInfo["rank"]}등을 차지했어요!`}</p>
                <p>{`별점 ${StoreInfo["stars"]}`}</p>
                <form onSubmit={Send}>
                    <h4 className='inlineBlock'>{`내가 남기는 ${StoreInfo["store_name"]} 간단 코멘트`}</h4>
                    <input onChange={updateNewComment} value={NewComment} placeholder="write your comment"/> 
                    <button type="submit">멘트</button>
                </form>
            </div> 
            <div className='button-wrap'>
                <Link to={`/Ranking/${categoryId}`}><button>랭킹페이지로 가기</button></Link>
                <Link to={`/GetReady/${categoryId}`}><button>다시하기</button></Link>
                <Link to={`/AllCategory/*`}><button>다른 월드컵 해보기</button></Link>
                <button>결과 공유하기</button>
            </div>
        </Container>
        
    )     
}

export default WinnerResult;

