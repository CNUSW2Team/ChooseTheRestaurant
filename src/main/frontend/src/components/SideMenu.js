import styles from "./sideMenu.module.css"


function SideMenu(props) {

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>{props.store_name}</div>
            <div className={styles.item} onClick={() => props.onClickHandler(0)}>상세정보</div>
            <div className={styles.item} onClick={() => props.onClickHandler(1)}>메뉴</div>
            <div className={styles.item} onClick={() => props.onClickHandler(2)}>리뷰</div>
        </div>
    );
}

export default SideMenu;