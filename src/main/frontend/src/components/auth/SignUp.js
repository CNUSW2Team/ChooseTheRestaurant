import React, {useEffect, useState} from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBInput,
    MDBIcon,
}
from 'mdb-react-ui-kit';
import axios from "axios";

function SignUp() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeatedPassword, setRepeatedPassword] = useState("");
    const [disableBtn, setDisableBtn] = useState(true);

    const updateUsername = e => setUsername(e.target.value);
    const updatePassword = e => setPassword(e.target.value);
    const updateRepeatedPassword = e => setRepeatedPassword(e.target.value);

    function checkValid() {
        if(!username || !password || !repeatedPassword) {
            setDisableBtn(true);
        } else setDisableBtn(false);
    }
    useEffect(() => {checkValid()}, [username, password, repeatedPassword]);

    function checkUsername() {

        axios.get('/auth/findUser', {params: {username: username}})
            .then((response) => {
                if(response.data) alert("이미 존재하는 이름입니다.")
                else signUp();
            })
    }

    function confirmPassword() {
        if(password !== repeatedPassword) {
            alert("The entered password is different");
            return false;
        }
        return true;
    }

    function signUp() {
        if(!confirmPassword()) return;

        axios.post('/auth/signUp', {username: username, password: password})
            .then((response) => {
            })
        window.location.href = `/`;
    }

    return (
        <MDBContainer fluid>

            <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
                <MDBCardBody>
                    <MDBRow>
                        <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                            <div className="d-flex flex-row align-items-center mb-4">
                                <MDBIcon fas icon="envelope me-3" size='lg'/>
                                <MDBInput label='Your Email' type='email' onChange={updateUsername}/>
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                                <MDBIcon fas icon="lock me-3" size='lg'/>
                                <MDBInput label='Password' type='password' onChange={updatePassword}/>
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                                <MDBIcon fas icon="key me-3" size='lg'/>
                                <MDBInput label='Repeat your password' type='password' onChange={updateRepeatedPassword}/>
                            </div>

                            <MDBBtn className='mb-4' size='lg' onClick={checkUsername} disabled={disableBtn}>Register</MDBBtn>

                        </MDBCol>

                        <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                            <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid/>
                        </MDBCol>

                    </MDBRow>
                </MDBCardBody>
            </MDBCard>

        </MDBContainer>
    );
}

export default SignUp;