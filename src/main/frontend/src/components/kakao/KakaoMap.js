/*global kakao*/
import React from 'react';
import { Link } from 'react-router-dom';

/*
<KakaoMap
name={"역전우동"}
address={"대전광역시 유성구 궁동 궁동로18번길 38"}
/>
 */
function KakaoMap(props) {

    function loadMap(name, address) {
        kakao.maps.load(() => {
            const container = document.getElementById('map');
            const options = {
                center: new kakao.maps.LatLng(33.450701, 126.570667),
                level: 3,
            };
            const map = new kakao.maps.Map(container, options);

            const geocoder = new kakao.maps.services.Geocoder();
            geocoder.addressSearch(address, function (result, status) {
                if (status === kakao.maps.services.Status.OK) {

                    var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                    var marker = new kakao.maps.Marker({
                        map: map,
                        position: coords
                    });

                    // 인포윈도우로 장소에 대한 설명을 표시합니다
                    var infowindow = new kakao.maps.InfoWindow({
                        content: `<div style="width:150px;text-align:center;padding:6px 0;">${name}</div>`
                    });
                    infowindow.open(map, marker);

                    // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                    map.setCenter(coords);
                }
            });
        });
    }
    return (
        <>
            <div id={"map"} style={{width:500, height:500}}>{loadMap(props.name, props.address)}</div>
        </>
    );
}

export default KakaoMap;