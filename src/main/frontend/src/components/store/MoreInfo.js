import axios from "axios";
import KakaoMap from "../map/KakaoMap";
import {Container as MapDiv, NaverMap, Marker, useNavermaps} from 'react-naver-maps'

function MoreInfo(props) {
    const navermaps = useNavermaps();

    return (
        <div className="d-flex flex-column align-items-center mt-5 me-5 bg-light p-4 rounded-4 justify-content-between" style={{height:"500px"}}>
            {/*<KakaoMap*/}
            {/*    name={props.info.store_name}*/}
            {/*    address={props.info.address}*/}
            {/*/>*/}
            <MapDiv style={{width: 400, height: 400, marginBottom:"10px"}}>
                <NaverMap
                    defaultCenter={new navermaps.LatLng(37.3595704, 127.105399)}
                    defaultZoom={15}>
                    <Marker
                        defaultPosition={new navermaps.LatLng(37.3595704, 127.105399)}
                    />
                </NaverMap>
            </MapDiv>
            <div className="">주소: {props.info.address}</div>
            <div>전화: {props.info.contact}</div>
            <div className="">평점: {props.info.averageStars}</div>
        </div>
    );
}

export default MoreInfo;