function TabBar(props) {

    return (
        <div>
            <ul className="nav flex nav-tabs">
                {/*<li className="nav-item">*/}
                {/*    <div className="nav-link" onClick={() => props.onClickHandler(0)}>상세정보</div>*/}
                {/*</li>*/}
                <li className="nav-item">
                    <div className="nav-link" onClick={() => props.onClickHandler(0)}>메뉴</div>
                </li>
                <li className="nav-item">
                </li>
                <li className="nav-item">
                    <div className="nav-link" onClick={() => props.onClickHandler(1)}>리뷰</div>
                </li>
            </ul>
            <div>
                {/*<div onClick={() => props.onClickHandler(0)}>상세정보</div>*/}
                {/*<div onClick={() => props.onClickHandler(1)}>메뉴</div>*/}
                {/*<div onClick={() => props.onClickHandler(2)}>리뷰</div>*/}
            </div>
        </div>
    );
}

export default TabBar;