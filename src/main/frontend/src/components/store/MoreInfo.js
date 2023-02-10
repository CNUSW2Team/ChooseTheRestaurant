import axios from "axios";
import KakaoMap from "../kakao/KakaoMap";

function MoreInfo(props) {
    return (
        <div className="d-flex flex-column align-items-center mt-5 me-5 bg-light">
            <KakaoMap
                name={props.info.store_name}
                address={props.info.address}
            />
            <div>주소: {props.info.address}</div>
            <div>전화: {props.info.contact}</div>
            <div>평점: {props.info.averageStars}</div>
        </div>
    );
}

export default MoreInfo;