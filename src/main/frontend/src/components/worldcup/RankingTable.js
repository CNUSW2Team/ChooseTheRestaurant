import axios from "axios";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Table} from "react-bootstrap";
import Pagination from 'react-js-pagination'
import PaginationBox from "../../util/PaginationBox";



function RankingTable(props) {
    let count = 1;
    const [ranking, setRanking] = useState([]);
    useEffect(() => {
        axios.get(`/api/Ranking/${props.category}`)
            .then(response => {
                setRanking(response.data);
                props.setStore(response.data)
                console.log("Ranking: ", response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    const [page, setPage] = useState(1);
    const [items, setItems] = useState(8);
    const [totalCount, setTotalCount] = useState(ranking.length);

    useEffect(() => {
        setTotalCount(ranking.length);
    }, [ranking])
    const handlePageChange = (page) => {
        setPage(page);
    };

    return (
        <div className="w-100 table-responsive p-5">
            <table className="table table-hover table-sm text-center">
                <caption className="caption caption-top">클릭시 상세정보를 확인 할 수 있습니다.</caption>
                <thead className="table-dark">
                <tr>
                    <th >순위</th>
                    {/*<th >사진</th>*/}
                    <th >이름</th>
                    <th >별점</th>
                    <th >승리</th>
                </tr>
                </thead>
                <tbody>
                {ranking.slice(items * (page - 1), items * (page - 1) + items)
                .map(v =>
                    <tr key={v.store_id} onClick={() => window.location.href=`/Store/${v.store_id}`}>
                        <td>{(page-1)*items + count++}</td>
                        {/*<td><img width={100} src={`/image/${v.store_id}`} /></td>*/}
                        <td>{v.store_name}</td>
                        <td>{Math.round(v.stars * 100)/100}</td>
                        <td>{v.winningCount}</td>
                    </tr>
                )}
                </tbody>
            </table>
            <PaginationBox>
                <Pagination
                    activePage={page}
                    itemsCountPerPage={items}
                    totalItemsCount={totalCount}
                    pageRangeDisplayed={5}
                    onChange={handlePageChange}>
                </Pagination>
            </PaginationBox>
        </div>
    );
}

export default RankingTable;

