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


function Game(props) {
    let {categoryId} = useParams();
    let {numOfRound} = useParams();

    // const [StoreInfo, setData] = useState([]); //첫데이터
    const [items, setItem] = useState([]); // 월드컵 아이템 리스트
    const [winners, setWinner] = useState([]);
    const [round, setRound] = useState(numOfRound);
    const [count, setCount] = useState(numOfRound/2);

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
        // if(count === 0){
        //     setCount(round/2);
        //     setItem(winners)
        //     setWinner([]);
        //     setRound(round/2);
        // }
        // else{
        //     setCount(count-1);
        // }
        //
        // if(round === 1){
        //     alert("게임종료");
        // }
        // console.log("count: ", count);
        // console.log("items: ", items);
        // console.log("winners: ", winners);
    }, [items]);

    // useEffect


    function WinnerChoice(e) {
        const newWinner = JSON.parse(e.currentTarget.getAttribute('value'))

        if(count === 0){
            setCount(round/2);
            setItem(winners)

            setWinner([]);
            setRound(round/2);
        }
        else{
            setCount(count-1);
        }

        if(round === 1){
            alert("게임종료");
        }
        console.log("count: ", count);
        console.log("items: ", items);
        console.log("winners: ", winners);

        setItem(items.slice(2))
        setWinner([...winners, newWinner])




        // console.log(newWinner)




        // console.log('winners :', winners)
        // if(count == 3) {
        //     console.log('라운드 종료')
        //     console.log('winners :',winners)
        //     setItem([])
        //     console.log('items :', items)
        //     SetRound(parseInt(round)/2)
        //     // if(winners.length == 1){
        //         console.log('게임종료')
        //         console.log(winners[0])
        //     }
        // } else {
        //     console.log(count)
        // }
    };


    // `/Result/${categoryId}/${StoreInfo[0] && StoreInfo[0]["store_id"]}`
    return (
        <>
            <h1>{round}강</h1>
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

