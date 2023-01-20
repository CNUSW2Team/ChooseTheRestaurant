
import React from 'react';
import {Link} from "react-router-dom";
function AdminPage(props) {
    return (
        <>
            <Link to={`/admin/AdminAddStore`}><button>가게 추가</button></Link>
            <button><Link to={`/admin/AdminAddMenuToStore`}> 가게에 메뉴 추가하기 </Link></button>
            <Link to={`/admin/ModifyCategory`}><button>카테고리 수정</button></Link>
        </>
    );
}

export default AdminPage;