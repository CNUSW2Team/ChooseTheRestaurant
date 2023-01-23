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


// function GameTest(props) {
//     let {
//         categoryId
//     } = useParams();
//     let {
//         numOfRound
//     } = useParams();

    // const Data = [{
    //         'store_id': 'ba209830-987c-4d30-8fc0-1921e8f7db9f',
    //         'store_name': '청춘우동'
    //     },
    //     {
    //         'store_id': 'f4ae598f-7bcb-440d-96f8-a19750b2ed4b',
    //         'store_name': '리코타코'
    //     },
    //     {
    //         'store_id': '86ac9f9a-02ac-4203-a849-d75f93e9f6a5',
    //         'store_name': '충대분식'
    //     },
    //     {
    //         'store_id': '83a1c4cc-bd29-4ca1-b1ed-29426fa72313',
    //         'store_name': '별리달리'
    //     },
    // ]

    // useEffect(() => {
    //     axios.get(`/Round/${categoryId}/${numOfRound}`)
    //         .then(response => {
    //             setData(response.data);
    //             setItem(response.data.sort(() => Math.random() - 0.5));
    //             console.log(response.data);
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         })
    // },
    // []);

    //     const [StoreInfo, setData] = useState([]); //첫데이터
    //     const [items, setItem] = useState([]); // 월드컵 아이템 리스트
    //     const [winners, SetWinner] = useState([]);

    //     useEffect(() => {
    //             setData(Data);
    //             setItem(Data.sort(() => Math.random() - 0.5));
    //         },
    //         []);

    //     // winner(클릭 시)만 보내고 slice하기
    //     // const WinnerChoice = e => {
    //     //     console.log(e)
    //     //     // SetWinner([...winners, ])
    //     // }
    //     // useEffect(WinnerChoice, [items]);


    //     const clickHandler = item => () => {
    //         if (items.length <= 2) {
    //             if (winners.length === 0) {
    //             setDisplays([food]);
    //             } else {
    //             let updatedItems = [...winners, item];
    //             setFoods(updatedItems);
    //             setDisplays([updatedItems[0], updatedItems[1]]);
    //             setWinners([]);
    //             }
    //         } else if (foods.length > 2) {
    //             setWinners([...winners, food]);
    //             setDisplays([foods[2], foods[3]]);
    //             setFoods(foods.slice(2));
    //         }
    //         };
    //     // 첫 랜더링 막은 ver.
    //     const WinnerChoice = (e) => {
    //         console.log(e)
    //     };

    //     // winner만 담고 스테이지(Round) 끝날때마다 setItems
    //     useEffect(() => {



    //     }, [winners])

    //     // categoryId의, numofRound만큼, random으로 가져오기
    //     // random 2개 보여주기, 선택한 store 다음 스테이지로 올리고 아닌 것 버리기
    //     // 하위 스테이지 비면 상위 스테이지로 옮기기
    //     // 상위스테이지에 하나만 남으면 해당 store 결과페이지로 보내기

    //     // `/Result/${categoryId}/${StoreInfo[0] && StoreInfo[0]["store_id"]}`
    //     return (
    //         <>
    //             {items.map(item => {
    //                 return(
    //                     <div className='inlineBlock'>
    //                         <p>{items["store_name"]}</p>
    //                         <img width={500} onClick={WinnerChoice(item)} src={`/img/${items["store_id"]}.jpg`} />
    //                     </div>
    //                 );
    //             })}
    //             <div className='inlineBlock'>
    //                 <p>{items[0] && items[0]["store_name"]}</p>
    //                 <img width={500} value={items[0] && items[0]["store_id"]} onClick={WinnerChoice} src={`/img/${items[0] && items[0]["store_id"]}.jpg`} />
    //             </div>
    //             <div className='inlineBlock'>
    //                 <p>{items[1] && items[1]["store_name"]}</p>
    //                 <img width={500} onClick={WinnerChoice} src={`/img/${items[1] && items[1]["store_id"]}.jpg`} />
    //             </div>
    //         </>
    //     );
    // }

    // export default GameTest;

    const GameTest = () => {
        let {categoryId} = useParams();
        let {numOfRound} = useParams();
    
        const items = [{
            'store_id': 'ba209830-987c-4d30-8fc0-1921e8f7db9f',
            'store_name': '청춘우동'
        },
        {
            'store_id': 'f4ae598f-7bcb-440d-96f8-a19750b2ed4b',
            'store_name': '리코타코'
        },
        {
            'store_id': '86ac9f9a-02ac-4203-a849-d75f93e9f6a5',
            'store_name': '충대분식'
        },
        {
            'store_id': '83a1c4cc-bd29-4ca1-b1ed-29426fa72313',
            'store_name': '별리달리'
        }
    ]
    
        const [foods, setFoods] = useState([]);
        const [displays, setDisplays] = useState([]);
        const [winners, setWinners] = useState([]);
        useEffect(() => {
            items.sort(() => Math.random() - 0.5);
            setFoods(items);
            setDisplays([items[0], items[1]]);
        }, []);

        const clickHandler = food => () => {
            if (foods.length <= 2) {
                if (winners.length === 0) {
                    setDisplays([food]);
                } else {
                    let updatedFood = [...winners, food];
                    setFoods(updatedFood);
                    setDisplays([updatedFood[0], updatedFood[1]]);
                    setWinners([]);
                }
            } else if (foods.length > 2) {
                setWinners([...winners, food]);
                setDisplays([foods[2], foods[3]]);
                setFoods(foods.slice(2));
            }
        };
        return ( 
            {displays.map(d => {
                return(
                    <div key={d.name} onClick={clickHandler(d)}>
                        <img src={d.src} />
                        <div>{d.name}</div>
                    </div>
                )
            })}
        );
    };

export default GameTest;