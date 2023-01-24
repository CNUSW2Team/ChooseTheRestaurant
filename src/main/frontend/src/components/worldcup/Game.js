import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Form, Table} from "react-bootstrap";
import {Link, useParams, useLocation} from "react-router-dom";



function Game(props) {
    let { categoryId } = useParams();
    let { numOfRound } = useParams();
    
    const [StoreInfo, setData] = useState([]); //첫데이터
    const [items, setItem] = useState([]); // 월드컵 아이템 리스트
    const [winners, SetWinner] = useState([]);

    useEffect(() => {
            axios.get(`/Round/${categoryId}/${numOfRound}`)
                .then(response => {
                    setData(response.data);
                    setItem(response.data.sort(() => Math.random() - 0.5));
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                })
        },
        []);

    // winner(클릭 시)만 보내고 slice하기
    // const WinnerChoice = e => {
    //     e.preventDefault();
    // }

    // useEffect(WinnerChoice, [items]);

    // winner만 담고 스테이지(Round) 끝날때마다 setItems
    useEffect(() => {



    }, [winners])

    
    // 선택한 store 다음 스테이지로 올리고 아닌 것 버리기
    // 하위 스테이지 비면 상위 스테이지로 옮기기
    // 상위스테이지에 하나만 남으면 해당 store 결과페이지로 보내기

    // `/Result/${categoryId}/${StoreInfo[0] && StoreInfo[0]["store_id"]}`
    return (
        <>
            <div className='inlineBlock'>
                <p>{items[0] && items[0]["store_name"]}</p>
                <img width={500} src={`/img/${items[0] && items[0]["store_id"]}.jpg`} />
            </div>
            <div className='inlineBlock'>
                <p>{items[1] && items[1]["store_name"]}</p>
                <img width={500} src={`/img/${items[1] && items[1]["store_id"]}.jpg`} />
            </div>

            {/* 랜덤월드컵 */}
        </>
    );
}

export default Game;