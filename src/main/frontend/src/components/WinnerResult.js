import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Form, Table} from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import styles from "./WinnerResult.module.css"

function WinnerResult(){
    let { categoryId } = useParams();
    let { storeId } = useParams();

    const [storeInfo, setData] = useState([]);
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

    return (
        // 랜덤 컬러, 크기 / 위치는 테두리로 고정
        <>
            <div className={styles.secLeft}>
                <p>{storeInfo[0] && storeInfo[0]["comments"][0]}</p>
                <p>{storeInfo[0] && storeInfo[0]["comments"][1]}</p>
                <p>{storeInfo[0] && storeInfo[0]["comments"][2]}</p>
                <img width={500} src={`/img/${storeId}.jpg`} />
            </div>
            <div className={styles.secLeft}>
                {/* storename도 파라미터로 가져와야하나? */}
                <p>{`리코타코는 전체 랭킹에서 ${storeInfo[0] && storeInfo[0]["rank"]}등을 차지했어요!`}</p>
                <p>{`별점 ${storeInfo[0] && storeInfo[0]["stars"]}`}</p>
                <form>
                    <h4>내가 남기는 리코타코 간단 코멘트</h4>
                    <input type="text" placeholder="write your comment"/>
                </form>
            </div>
            <div className='button-wrap'>
                <Link to={`/Ranking/${categoryId}`}><button>랭킹페이지로 가기</button></Link>
                <Link to={`/GetReady/${categoryId}`}><button>다시하기</button></Link>
                <Link to={`/AllCategory/*`}><button>다른 월드컵 해보기</button></Link>
                <button>결과 공유하기</button>
            </div>
            
        </>
        
    );        
}

export default WinnerResult;