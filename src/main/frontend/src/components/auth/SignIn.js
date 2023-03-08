import React, {useEffect, useState} from 'react';
import axios from "axios";

function SignIn() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const updateUsername = e => setUsername(e.target.value);
    const updatePassword = e => setPassword(e.target.value);

    useEffect(() => {
        if (localStorage.getItem("jwt")) {
            window.location.href = `/`;
        }
    })

    function checkBlank() {
        if (!username) {
            alert("아이디를 입력해주세요");
            return false;
        }
        if (!password) {
            alert("비밀번호를 입력해주세요");
            return false;
        }
        return true;
    }

    function signIn() {
        if (!checkBlank()) {
            return;
        }
        axios.post('/auth/signIn', {username: username, password: password})
            .then((response) => {
                localStorage.setItem("jwt", response.data);
                localStorage.setItem("username", username);
                window.location.href = `/`;
            })
            .catch((err) => alert("아이디 혹은 비밀번호를 잘못 입력하셨거나 존재하지 않는 아이디입니다."))
    }

    return (
        <div className="p-3 m-5 d-flex flex-column align-items-center">
            <div className="mb-3 w-50">
                <label htmlFor="form1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="form1"
                       placeholder="name@example.com"
                       onChange={updateUsername}/>

            </div>
            <div className="mb-3 w-50">
                <label htmlFor="form2" className="form-label">Password</label>
                <input type="password" className="form-control" id="form2"
                       placeholder="*****"
                       onChange={updatePassword}/>
            </div>

            {/*<MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email' onChange={updateUsername}/>*/}
            {/*<MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' onChange={updatePassword}/>*/}

            {/*<div className="d-flex justify-content-between mx-3 mb-4">*/}
            {/*    <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />*/}
            {/*    <a href="!#">Forgot password?</a>*/}
            {/*</div>*/}
            <div>
                <button className="btn btn-primary mx-2" onClick={signIn}>Sign in</button>
                <button className="btn btn-primary mx-2" onClick={() => window.location.href = '/signUp'}>Register
                </button>
            </div>


            {/*<div className="text-center">*/}
            {/*    <p>Not a member? <a href="/signUp">Register</a></p>*/}
            {/*    <p>or sign up with:</p>*/}

            {/*    <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>*/}
            {/*        <button tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>*/}
            {/*            <MDBIcon fab icon='facebook-f' size="sm"/>*/}
            {/*        </button>*/}

            {/*        <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>*/}
            {/*            <MDBIcon fab icon='twitter' size="sm"/>*/}
            {/*        </MDBBtn>*/}

            {/*        <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>*/}
            {/*            <MDBIcon fab icon='google' size="sm"/>*/}
            {/*        </MDBBtn>*/}

            {/*        <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>*/}
            {/*            <MDBIcon fab icon='github' size="sm"/>*/}
            {/*        </MDBBtn>*/}

            {/*    </div>*/}
            {/*</div>*/}

        </div>
    )

}

export default SignIn;