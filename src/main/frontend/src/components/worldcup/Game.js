import React, {
    useEffect,
    useState
} from 'react';
import axios from "axios";
import {
    Button,
    Form,
    Table
} from "react-bootstrap";
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
    const [winners, SetWinner] = useState([]);
    const [round, SetRound] = useState();
    const [count, SetCount] = useState(0);

    useEffect(() => {
        axios.get(`/Round/${categoryId}/${numOfRound}`)
            .then(response => {
                setItem(response.data);
                SetRound(numOfRound);
                // console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    },
    []);

    
    function WinnerChoice(e){
        const newWinner = JSON.parse(e.currentTarget.getAttribute('value'))
        SetCount(count+1)
        
        setItem(items.slice(2))
        SetWinner([...winners, newWinner])
        console.log(newWinner)
        console.log('item :', items)
        console.log('winners :',winners)
        if(count == 3) {
            console.log('라운드 종료')
            console.log('winners :',winners)
            setItem([])
            console.log('items :', items)
            SetRound(parseInt(round)/2)   
            if(winners.length == 1){
                console.log('게임종료')
                console.log(winners[0])
            }
        } else {
            console.log(count)
        }
    };

  
        // `/Result/${categoryId}/${StoreInfo[0] && StoreInfo[0]["store_id"]}`
        return (
            <>
                <h1>{round}강</h1>
                <div className='inlineBlock'>
                    <p>{items[0] && items[0]["store_name"]}</p>
                    <img width={300} value={JSON.stringify(items[0])} onClick={e => WinnerChoice(e)} src={`/image/${items[0] && items[0]["store_id"]}`} />
                </div>
                <div className='inlineBlock'>
                    <p>{items[1] && items[1]["store_name"]}</p>
                    <img width={300} value={JSON.stringify(items[1])} onClick={e => WinnerChoice(e)} src={`/image/${items[1] && items[1]["store_id"]}`} />
                </div>

            </>
        );
    }

export default Game;

