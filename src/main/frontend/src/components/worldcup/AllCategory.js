import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import {createFuzzyMatcher} from "../../util/util";
import CardItem from "../Cards/Carditem";
import '../Cards/Cards.css';
import styles from "./AllCategory.module.css"
import buttonStyle from "../button.module.css";

function AllCategory() {
    const [category, setData] = useState([]);
    const [searchBox, setSearchBox] = useState('');
    const updateSearchBox = e => setSearchBox(e.target.value);

    useEffect(() => {
        axios.get('/AllCategory')
            .then(response => {
                setData(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    return (<div className={styles.wrapper}>
        <div className='cards'>
            <h1>진행할 월드컵을 선택하세요!</h1>

            <div style={{display:"flex", justifyContent:"space-between"}}>
                <div>
                    <input className={styles.input} id={"searchArea"} value={searchBox} onChange={updateSearchBox}
                           placeholder={"검색할 내용을 입력하세요."} size={50}/>
                    <button className={buttonStyle.button} type={"button"} onClick={() => {setSearchBox('')}}>초기화</button>
                </div>

                <button className={buttonStyle.button} type={"button"} onClick={() => {window.location.href = `/AddCategory`}}> 월드컵 만들기 </button>
            </div>
            <div className="cards__container">
                <div className="cards__wrapper">
                    <ul className="cards__items">
                    {category.filter(v => createFuzzyMatcher(searchBox).test(v.category_name)).map(v =>
                            <CardItem
                                src={`/image/${v.category_id}`}
                                name={v.category_name}
                                favorite={`Favorite: ${v.favorite}`}
                                path={`/GetReady/${v.category_id}`}
                                num={v.num_of_stores}
                            />
                        ,)}</ul>
                </div>
            </div>
        </div>
    </div>);
}


export default AllCategory;
