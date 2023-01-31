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


function GameTest(props) {
    let {categoryId} = useParams();
    let {numOfRound} = useParams();
   
    const [StoreInfo, setData] = useState([]); //첫데이터
    const [items, setItem] = useState([]); // 월드컵 아이템 리스트
    const [winners, SetWinner] = useState([]);
    const [round, SetRound] = useState();

    useEffect(() => {
        axios.get(`/Round/${categoryId}/${numOfRound}`)
            .then(response => {
                setData(response.data);
                setItem(response.data.sort(() => Math.random() - 0.5));
                SetRound(numOfRound);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    },
    []);

    
    function WinnerChoice(e){
        const newWinner = JSON.parse(e.currentTarget.getAttribute('value'))
        console.log(newWinner)
        SetWinner([...winners, newWinner])
        if(items.length <= 2) {
            console.log('hgfgfdfsfsdfddsfsd')
            setItem(winners)
            SetRound(parseInt(round)/2)    
        } else {
            setItem(items.slice(2))
        }
        
    };

    // winner만 담고 스테이지(Round) 끝날때마다 setItems
    // useEffect(() => {



    // }, [winners])

        // categoryId의, numofRound만큼, random으로 가져오기
        // random 2개 보여주기, 선택한 store 다음 스테이지로 올리고 아닌 것 버리기
        // 하위 스테이지 비면 상위 스테이지로 옮기기
        // 상위스테이지에 하나만 남으면 해당 store 결과페이지로 보내기

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

export default GameTest;




    
//         const [foods, setFoods] = useState([]);
//         const [displays, setDisplays] = useState([]);
//         const [winners, setWinners] = useState([]);
//         useEffect(() => {
//             items.sort(() => Math.random() - 0.5);
//             setFoods(items);
//             setDisplays([items[0], items[1]]);
//         }, []);

//         const clickHandler = food => () => {
//             if (foods.length <= 2) {
//                 if (winners.length === 0) {
//                     setDisplays([food]);
//                 } else {
//                     let updatedFood = [...winners, food];
//                     setFoods(updatedFood);
//                     setDisplays([updatedFood[0], updatedFood[1]]);
//                     setWinners([]);
//                 }
//             } else if (foods.length > 2) {
//                 setWinners([...winners, food]);
//                 setDisplays([foods[2], foods[3]]);
//                 setFoods(foods.slice(2));
//             }
//         };
//         return ( 
//             {displays.map(d => {
//                 return(
//                     <div key={d.name} onClick={clickHandler(d)}>
//                         <img src={d.src} />
//                         <div>{d.name}</div>
//                     </div>
//                 )
//             })}
//         );
//     };

// export default GameTest;