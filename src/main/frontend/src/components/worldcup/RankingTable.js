import axios from "axios";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Table} from "react-bootstrap";

function RankingTable(props) {
    let count = 1;
    const [ranking, setRanking] = useState([]);
    useEffect(() => {
        axios.get(`/Ranking/${props.category}`)
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
        <div>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th >순위</th>
                    <th >사진</th>
                    <th >이름</th>
                    <th >별점</th>
                    <th >승리</th>
                    <th >상세정보</th>
                </tr>
                </thead>
                <tbody>

                {ranking.map(v =>
                    <tr key={v.store_id}>
                        <td>{count++}</td>
                        <td><img width={100} src={`/image/${v.store_id}`} /></td>

                        <td>{v.store_name}</td>
                        <td>{v.stars}</td>
                        <td>{v.winningCount}</td>
                        <td><Link to={`/Store/${v.store_id}`}> 상세정보 </Link></td>
                    </tr>
                )}
                </tbody>
            </Table>
        </div>
    );
}

export default RankingTable;

