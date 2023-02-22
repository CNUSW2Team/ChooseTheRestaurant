import {Container as MapDiv, Marker, NaverMap, useNavermaps} from 'react-naver-maps'

function MoreInfo(props) {
    const navermaps = useNavermaps();

    return (
        <div className="d-flex flex-column align-items-center mt-5 me-5 bg-light p-4 pb-2 rounded-4 justify-content-between" style={{width:"450px", height:"550px"}}>
            {/*<KakaoMap*/}
            {/*    name={props.info.store_name}*/}
            {/*    address={props.info.address}*/}
            {/*/>*/}
            <MapDiv style={{width: "100%", height: "100%"}}>
                <NaverMap
                    defaultCenter={new navermaps.LatLng(37.3595704, 127.105399)}
                    defaultZoom={15}>
                    <Marker
                        defaultPosition={new navermaps.LatLng(37.3595704, 127.105399)}
                    />
                </NaverMap>
            </MapDiv>
            <div className="text-center bg-white w-100 rounded-4 my-1 p-1 mt-3">주소: {props.info.address}</div>
            <div className="text-center bg-white w-100 rounded-4 my-1 p-1">전화: {props.info.contact}</div>
            <div className="text-center bg-white w-100 rounded-4 my-1 p-1">평점: {props.info.averageStars}</div>
        </div>
    );
}

export default MoreInfo;