import React, {useEffect, useState} from 'react';
import axios from "axios";
import {createFuzzyMatcher} from "../../util/util";

function AllMenu() {
    const [menu, setMenu] = useState([]);
    const [tag, setTag] = useState([]);
    const [searchBox, setSearchBox] = useState('');
    const updateSearchBox = e => setSearchBox(e.target.value);
    const [selected, setSelected] = useState([]);

    const updateSelect = (e, value) => {
        selected.includes(value) ?
            setSelected(selected.filter((selected) => selected !== value)) :
            setSelected([...selected, value]);
    }

    // useEffect(() => {
    //     console.log("selected: ", selected);
    // }, [selected])

    useEffect(() => {
        axios.get('/api/Menu')
            .then(response => {
                setMenu(response.data);
            })
            .catch(error => {
                console.log(error);
            })
        axios.get('/api/Tag')
            .then(response => {
                setTag(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    return (<div className="p-5">
        <h4 className="pt-2 ps-2"> 메뉴를 선택하세요</h4>
        <small className="p-2 text-muted"> 선택시 가게로 이동합니다. </small>
        <div>
            <div className="d-flex w-50 m-2">
                <input className="form-control w-75" id="searchArea" value={searchBox}
                       onChange={updateSearchBox}
                       placeholder="검색할 메뉴를 입력하세요."/>
                <button className="btn btn-outline-secondary" type="submit" onClick={() => setSearchBox('')}>초기화
                </button>
            </div>
            <div className="p-2">
                {tag && tag.map((v) =>
                    <button
                        className={"btn btn-sm rounded-4 m-1 " + (selected.includes(v.tag) ? "btn-primary" : "btn-secondary")}
                        onClick={(e) => updateSelect(e, v.tag)}
                        key={v.tag}>
                        #{v.tag}
                    </button>
                )}
            </div>
            <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 row-cols-xxl-4 g-4 w-100 m-auto">
                {menu.filter(v => createFuzzyMatcher(searchBox).test(v.menu_name.toLowerCase()))
                    .filter(v => {
                        return selected.length === 0 ? true :
                            selected.every(w => v.tag.includes(w))
                    }).map(v =>
                            <div className="col" key={v.menu_id}
                                 onClick={() => window.location.href = `/Store/${v.store_id}`}>
                                <div className="card shadow">
                                    <div className="row g-2">
                                        <div className="col">
                                            <img src={`/image/${v.menu_id}`} className="rounded-start img-fluid h-100"
                                                 style={{objectFit: "cover"}}/>
                                        </div>
                                        <div className="col-7" style={{minHeight: "200px"}}>
                                            <div className="card-body d-flex flex-column justify-content-between h-100">
                                                <div>
                                                    <h5 className="card-title fw-bold text-truncate w-100">{v.menu_name}</h5>
                                                    <p className="card-text">{v.price}원</p>
                                                </div>
                                                <p className="card-text">
                                                    {v.tag.map(w => <a className="me-2" key={w}>#{w}</a>)}
                                                </p>
                                                <small className="text-muted text-end">
                                                    {v.store_name}
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ,)}
            </div>
        </div>
    </div>);
}

export default AllMenu;

