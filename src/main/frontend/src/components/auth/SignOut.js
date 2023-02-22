import React from 'react';
import {
    MDBBtn
}
from 'mdb-react-ui-kit';

function SignOut() {
    function signOut() {
        localStorage.removeItem("jwt");
        localStorage.removeItem("username");
        window.location.href = `/`;
    }

    function moveSignInPage() {window.location.href = `/login`}

    return (
        <>
            {localStorage.getItem("jwt") ? <button className="btn btn-primary rounded-4" onClick={signOut}>로그아웃</button> :
                <button className="btn btn-primary rounded-4" onClick={moveSignInPage}>로그인</button>}
        </>
    )

}

export default SignOut;