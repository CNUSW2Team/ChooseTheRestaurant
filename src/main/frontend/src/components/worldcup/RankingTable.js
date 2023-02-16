import axios from "axios";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Table} from "react-bootstrap";


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

    return (
        <div className="w-75 table-responsive m-3">
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
                {ranking.map(v =>
                    <tr key={v.store_id} onClick={() => window.location.href=`/Store/${v.store_id}`}>
                        <td>{count++}</td>
                        {/*<td><img width={100} src={`/image/${v.store_id}`} /></td>*/}
                        <td>{v.store_name}</td>
                        <td>{Math.round(v.stars * 100)/100}</td>
                        <td>{v.winningCount}</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}

export default RankingTable;

