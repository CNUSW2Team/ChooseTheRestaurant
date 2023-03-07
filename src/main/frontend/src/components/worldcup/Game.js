import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import {Timeline, Tween} from 'react-gsap';
import gsap from 'gsap';

function Game() {
    const {categoryId} = useParams();
    const {numOfRound} = useParams();

    const [items, setItem] = useState([]); // 월드컵 아이템 리스트
    const [winners, setWinner] = useState([]);
    const [round, setRound] = useState(numOfRound);
    const [count, setCount] = useState(1);


    useEffect(() => {
        axios.get(`/api/Round/${categoryId}/${numOfRound}`)
            .then(response => {
                setItem(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    useEffect(() => {
        if (items.length === 0 && winners.length === 1) {
            window.location.replace(`/Result/${categoryId}/${winners[0]["store_id"]}`);
            axios.post(`/api/winCount/${categoryId}/${winners[0].store_id}`)
                .catch(error => {
                    console.log(error);
                })
            return;
        }
        if (winners.length === round / 2) {
            setItem(winners);
            setWinner([]);
            setRound(round / 2);
            setCount(1);
        }
        console.log("");
        console.log("round: ", round);
        console.log("items: ", items);
        console.log("winners: ", winners);
    }, [items]);

    const box1Ref = useRef(null);
    const box2Ref = useRef(null);

    const timeline1 = gsap.timeline();
    const timeline2 = gsap.timeline();

    function WinnerChoice(item) {
        // const newWinner = JSON.parse(e.currentTarget.getAttribute('value'));
        setTimeout(() =>{
            const newWinner = item;
            setItem(items.slice(2));
            setWinner([...winners, newWinner]);
            if (round !== 2) setCount(count + 1);
        }, 3000);
    }

    return (<div className="d-flex flex-column p-4 overflow-hidden">
        <div className="p-3 d-flex">
            <div>
                {round !== 2 ? <h1>{round}강</h1> : <h1> 결승 </h1>}
            </div>
            <h1>
                ({count}/{round / 2})
            </h1>
        </div>

        <div className="row justify-content-center">
            <div className="col card w-50 m-5 overflow-hidden" ref={box1Ref} style={{maxHeight:"60vh", maxWidth:"60vh"}}
                 onClick={() => {
                     timeline1
                         .to(box2Ref.current, 0.5, {display:"none", transform: "translateX(500%)"})
                         .to(box2Ref.current, 2.5, {})
                         .to(box2Ref.current, 0, {transform: "none", display:"block"});
                     timeline2
                         .to(box1Ref.current, 1, {})
                         .to(box1Ref.current, 2, {})
                         .to(box1Ref.current, 0, {});
                     WinnerChoice(items[0])
                 }}>
                <img src={`/image/${items[0] && items[0]["store_id"]}`} className="rounded-start img-fluid h-100 w-100" />
                <div className="carousel-caption fs-3">
                    <p>{items[0] && items[0]["store_name"]}</p>
                </div>
                <a href="#" className="stretched-link"></a>
            </div>
            {/*<h3>vs</h3>*/}
            <div className="col card w-50 m-5 overflow-hidden" ref={box2Ref} style={{maxHeight:"60vh", maxWidth:"60vh"}}
                 onClick={() => {
                     timeline2
                         .to(box1Ref.current, 0.5, {display:"none", transform: "translateX(-500%)"})
                         .to(box1Ref.current, 2.5, {})
                         .to(box1Ref.current, 0, {transform: "none", display:"block"});
                     timeline1
                         .to(box2Ref.current, 1, {})
                         .to(box2Ref.current, 2, {})
                         .to(box2Ref.current, 0, {});
                     WinnerChoice(items[1])
                 }}>
                <img src={`/image/${items[1] && items[1]["store_id"]}`} className="rounded-start img-fluid h-100 w-100"/>
                <div className="carousel-caption fs-3">
                    <p>{items[1] && items[1]["store_name"]}</p>
                </div>
                <a href="#" className="stretched-link"></a>
            </div>
        </div>
    </div>);
}

export default Game;

