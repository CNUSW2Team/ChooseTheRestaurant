import styles from "./table.module.css"

function Menus(props) {
    return (
        <table className={styles.table} style={{width:"620px"}}>
            <thead className={styles.thead}>
            <tr>
                <th className={styles.th}>메뉴명</th>
                <th className={styles.th}>가격</th>
            </tr>
            </thead>
            <tbody>
            {props.menus && props.menus.map(v => <tr>
                <td className={styles.td}>{v.menu_name}</td>
                <td className={styles.td}>{v.price}</td>
            </tr>,)}
            </tbody>
        </table>
);
}

export default Menus;

