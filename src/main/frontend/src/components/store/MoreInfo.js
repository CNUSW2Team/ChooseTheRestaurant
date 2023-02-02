import axios from "axios";

function MoreInfo(props) {
    return (
        <div>
            <div>가게: {props.info.store_name}</div>
            <div>주소: {props.info.address}</div>
            <div>전화: {props.info.contact}</div>
            <div>평점: {props.info.averageStars}</div>
        </div>
    );
}

export default MoreInfo;