/*global kakao*/
import React, {useEffect, useState} from 'react';
import axios from "axios";
import {
    MDBContainer,
    MDBInput,
    MDBCheckbox,
    MDBBtn,
    MDBIcon
}
from 'mdb-react-ui-kit';


function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const updateUsername = e => setUsername(e.target.value);
    const updatePassword = e => setPassword(e.target.value);

    useEffect(() => {
        if(localStorage.getItem("jwt")) {
            window.location.href = `/`;
        }
    })

    function checkBlank() {
        if(!username) {
            alert("아이디를 입력해주세요");
            return -1;
        }
        if(!password) {
            alert("비밀번호를 입력해주세요");
            return -1;
        }
        return 1;
    }

    function executeLogin() {
        if(checkBlank() != 1) {
            return;
        }

        axios.post('/auth/login', {username: username, password: password})
            .then((response) => { localStorage.setItem("jwt", response.data);})
        window.location.href = `/`;
    }

    return(
        <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

            <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email' onChange={updateUsername}/>
            <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' onChange={updatePassword}/>

            <div className="d-flex justify-content-between mx-3 mb-4">
                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                <a href="!#">Forgot password?</a>
            </div>

            <MDBBtn className="mb-4" onClick={executeLogin}>Sign in</MDBBtn>

            <div className="text-center">
                <p>Not a member? <a href="#!">Register</a></p>
                <p>or sign up with:</p>

                <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
                    <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                        <MDBIcon fab icon='facebook-f' size="sm"/>
                    </MDBBtn>

                    <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                        <MDBIcon fab icon='twitter' size="sm"/>
                    </MDBBtn>

                    <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                        <MDBIcon fab icon='google' size="sm"/>
                    </MDBBtn>

                    <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                        <MDBIcon fab icon='github' size="sm"/>
                    </MDBBtn>

                </div>
            </div>

        </MDBContainer>
    )

}

export default Login;