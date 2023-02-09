import React, {
    useEffect,
    useState
} from 'react';
import axios from "axios";
import {
    Link,
    useParams,
    useLocation
} from "react-router-dom";
import useDidMountEffect from '../useDidMountEffect'


function Game({}) {
    const {categoryId} = useParams();
    const {numOfRound} = useParams();

    const [items, setItem] = useState([]); // 월드컵 아이템 리스트
    const [winners, setWinner] = useState([]);
    const [round, setRound] = useState(numOfRound);
    // const [count, setCount] = useState(round/2);

    useEffect(() => {
            axios.get(`/Round/${categoryId}/${numOfRound}`)
                .then(response => {
                    setItem(response.data);
                })
                .catch(error => {
                    console.log(error);
                })
        },
        []);

    useDidMountEffect(() => {
        if(items.length === 0 && winners.length === 1){
            alert("게임종료");
            window.location.href = `/Result/${categoryId}/${winners[0]["store_id"]}`;
            return ;
        }

        if(winners.length === round/2){
            console.log("test");
            setItem(winners);
            setWinner([]);
            setRound(round/2);
        }

        console.log("");
        console.log("round: ", round);
        console.log("items: ", items);
        console.log("winners: ", winners);
    }, [items]);


    function WinnerChoice(e) {
        const newWinner = JSON.parse(e.currentTarget.getAttribute('value'));
        setItem(items.slice(2));
        setWinner([...winners, newWinner]);
    }


    return (
        <>
            {round !== 2 ? <h1>{round}강</h1> : <h1> 결승 </h1>}
            <div className='inlineBlock'>
                <p>{items[0] && items[0]["store_name"]}</p>
                <img width={300} value={JSON.stringify(items[0])} onClick={e => WinnerChoice(e)}
                     src={`/image/${items[0] && items[0]["store_id"]}`}/>
            </div>
            <div className='inlineBlock'>
                <p>{items[1] && items[1]["store_name"]}</p>
                <img width={300} value={JSON.stringify(items[1])} onClick={e => WinnerChoice(e)}
                     src={`/image/${items[1] && items[1]["store_id"]}`}/>
            </div>

        </>
    );
}

export default Game;

