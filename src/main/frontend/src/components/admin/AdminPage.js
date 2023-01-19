
import React from 'react';
import {Link} from "react-router-dom";
function AdminPage(props) {
    return (
        <>
            <Link to={`/admin/AdminAddStore`}><button>가게 추가</button></Link>
            <Link to={`/admin/ModifyCategory`}><button>카테고리 수정</button></Link>
        </>
    );
}

export default AdminPage;