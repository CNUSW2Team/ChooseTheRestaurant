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
            {localStorage.getItem("jwt") ? <MDBBtn onClick={signOut}>로그아웃</MDBBtn> :
                <MDBBtn onClick={moveSignInPage}>로그인</MDBBtn>}
        </>
    )

}

export default SignOut;