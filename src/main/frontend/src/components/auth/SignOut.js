import React from 'react';
import {
    MDBBtn
}
from 'mdb-react-ui-kit';

function SignOut() {
    function signOut() {
        localStorage.clear();
        window.location.href = `/`;
    }

    function moveSignInPage() {window.location.href = `/login`}

    return (
        <>
            {localStorage.getItem("jwt") ? <button onClick={signOut}>로그아웃</button> :
                <MDBBtn onClick={moveSignInPage}>로그인</MDBBtn>}
        </>
    )

}

export default SignOut;