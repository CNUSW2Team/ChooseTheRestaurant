import {Container as MapDiv, Marker, NaverMap, useNavermaps} from 'react-naver-maps'

function MoreInfo(props) {
    const navermaps = useNavermaps();

    return (
        <div className="d-flex flex-column align-items-center mt-5 me-5 bg-light p-4 rounded-4 justify-content-between"
             style={{width: "450px", height: "500px"}}>
            <MapDiv style={{width: "100%", height: "100%"}}>
                <NaverMap
                    defaultCenter={new navermaps.LatLng(37.3595704, 127.105399)}
                    defaultZoom={15}>
                    <Marker
                        defaultPosition={new navermaps.LatLng(37.3595704, 127.105399)}
                    />
                </NaverMap>
            </MapDiv>

            <div className="input-group input-group-sm mb-3">
                <span className="input-group-text" id="address">주소</span>
                <input type="text" className="form-control text-center" value={props.info.address}/>
            </div>
            <div className="input-group input-group-sm mb-3">
                <span className="input-group-text" id="phoneNumber">전화</span>
                <input type="text" className="form-control text-center" value={props.info.contact}/>
            </div>

            {props.info.times && props.info.times.map(v =>
                <div className="input-group input-group-sm">
                    <span className="input-group-text" id="openingHour">{v.day}</span>
                    <input type="text" className="form-control text-center" value={v.hours}/>
                </div>
            )}
        </div>
    );
}

export default MoreInfo;