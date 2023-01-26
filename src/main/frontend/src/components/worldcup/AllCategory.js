import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Form, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import {createFuzzyMatcher} from "../../util/util";
import styles from "../table.module.css"
import CardItem from "../Cards/Carditem";
import '../Cards/Cards.css';

function AllCategory() {
    const [category, setData] = useState([]);
    const [searchBox, setSearchBox] = useState('');
    const updateSearchBox = e => setSearchBox(e.target.value);
    const resetSearchBox = () => setSearchBox('');

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

    return (<div>
        <div className='cards'>
            <h1>진행할 월드컵을 선택하세요!</h1>
            <button><Link to={`/AddCategory`}> 월드컵 만들기 </Link></button>
            <div><input id={"searchArea"} value={searchBox} onChange={updateSearchBox}
                        placeholder={"Type 'Name' to Search"}/>
                <button type={"button"} onClick={resetSearchBox}>clear</button>
            </div>
            <div className="cards__container">
                <div className="cards__wrapper">
                    <ul className="cards__items" data-columns="2">
                    {category.filter(v => createFuzzyMatcher(searchBox).test(v.category_name)).map(v =>
                            <CardItem
                                src={`/img/${v.category_id}.jpg`}
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
