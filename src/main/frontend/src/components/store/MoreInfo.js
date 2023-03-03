import {useEffect, useRef} from "react";

function MoreInfo(props) {

    const mapElement = useRef(null);
    const { naver } = window;

    useEffect(() => {
        if (!mapElement.current || !naver) return;

        // 지도에 표시할 위치의 위도와 경도 좌표를 파라미터로 넣어줍니다.
        const location = new naver.maps.LatLng(props.info.latitude, props.info.longitude);
        const mapOptions: naver.maps.MapOptions = {
            center: location,
            zoom: 18,
            zoomControl: true,
            zoomControlOptions: {
                position: naver.maps.Position.TOP_RIGHT,
            },
        };
        const map = new naver.maps.Map(mapElement.current, mapOptions);
        new naver.maps.Marker({
            position: location,
            map,
        });
    }, [props]);

    return (
        <div
            className="d-flex flex-column align-items-center mt-5 me-5 bg-light p-4 pb-2 rounded-4 justify-content-between"
            style={{width: "450px", height: "550px"}}>
            <div ref={mapElement} style={{width: "100%", height: "100%"}} />
            <div className="text-center bg-white w-100 rounded-4 my-1 p-1 mt-3">주소: {props.info.address}</div>
            <div className="text-center bg-white w-100 rounded-4 my-1 p-1">전화: {props.info.contact}</div>
            <div className="text-center bg-white w-100 rounded-4 my-1 p-1">평점: {props.info.averageStars}</div>
        </div>
    );
}

export default MoreInfo;