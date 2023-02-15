import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import useDidMountEffect from '../useDidMountEffect'

function Game() {
    const {categoryId} = useParams();
    const {numOfRound} = useParams();

    const [items, setItem] = useState([]); // 월드컵 아이템 리스트
    const [winners, setWinner] = useState([]);
    const [round, setRound] = useState(numOfRound);
    const [count, setCount] = useState(1);

    useEffect(() => {
        axios.get(`/Round/${categoryId}/${numOfRound}`)
            .then(response => {
                setItem(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    useDidMountEffect(() => {
        if (items.length === 0 && winners.length === 1) {
            window.location.replace( `/Result/${categoryId}/${winners[0]["store_id"]}`);
            axios.post(`/winCount/${categoryId}/${winners[0].store_id}`)
                .catch(error => {
                    console.log(error);
                })
            return;

        }
        if (winners.length === round / 2) {
            console.log("test");
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

    function WinnerChoice(item) {
        // const newWinner = JSON.parse(e.currentTarget.getAttribute('value'));
        const newWinner = item;
        setItem(items.slice(2));
        setWinner([...winners, newWinner]);
        setCount(count+1);
    }

    return (<div className="d-flex flex-column p-4">
        <div className="p-3 d-flex">
            <div>
                {round !== 2 ? <h1>{round}강</h1> : <h1> 결승 </h1>}
            </div>
            <h1>
                ({count}/{round/2})
            </h1>
        </div>
        <div className="d-flex justify-content-center align-items-center">
            <div className="card w-auto m-5 overflow-hidden" style={{maxWidth:"35%", maxHeight:"70vh"}}  onClick={() => WinnerChoice(items[0])}>
                <img src={`/image/${items[0] && items[0]["store_id"]}`} alt="..." />
                <div className="carousel-caption fs-3">
                    <p>{items[0] && items[0]["store_name"]}</p>
                </div>
                <a href="#" className="stretched-link"></a>
            </div>
            <h3>vs</h3>
            <div className="card w-auto m-5 overflow-hidden"  style={{maxWidth:"35%", maxHeight:"70vh"}} onClick={() => WinnerChoice(items[1])}>
                <img src={`/image/${items[1] && items[1]["store_id"]}`} className="" alt="..."/>
                <div className="carousel-caption fs-3">
                    <p>{items[1] && items[1]["store_name"]}</p>
                </div>
                <a href="#" className="stretched-link"></a>
            </div>
        </div>
    </div>);
}



export default Game;

