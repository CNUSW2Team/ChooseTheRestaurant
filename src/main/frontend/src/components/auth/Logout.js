import React from 'react';

function Logout() {
    function executeLogout() {
        localStorage.removeItem("jwt");
        window.location.href = `/`;
    }

    function moveLoginPage() {window.location.href = `/login`}

    return (
        <>
            {localStorage.getItem("jwt") ? <button onClick={executeLogout}>로그아웃</button> :
                <button onClick={moveLoginPage}>로그인</button>}
        </>
    )

}

export default Logout;