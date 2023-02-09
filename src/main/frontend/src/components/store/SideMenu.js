

function SideMenu(props) {

    return (
        <div>
            <div>{props.store_name}</div>
            <div>
            {props.contentItem.idx === 0 ? <div onClick={() => props.onClickHandler(0)}>상세정보</div> :
                                           <div onClick={() => props.onClickHandler(0)}>상세정보</div>}
            {props.contentItem.idx === 1 ? <div onClick={() => props.onClickHandler(1)}>메뉴</div> :
                <div onClick={() => props.onClickHandler(1)}>메뉴</div>}
            {props.contentItem.idx === 2 ? <div onClick={() => props.onClickHandler(2)}>리뷰</div> :
                <div onClick={() => props.onClickHandler(2)}>리뷰</div>}
            </div>
        </div>
    );
}

export default SideMenu;