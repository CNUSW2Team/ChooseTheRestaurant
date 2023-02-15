/*global kakao*/
import React from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';


function Login() {

    function executeLogin(username, password) {
        axios.post('/back/login',
            {username: username, password: password})
            .then((response) =>
            {console.log(response.data);
            localStorage.setItem("jwt", response.data)})
    }

    return(
        <div>
            <h1>Hello!</h1>
            <button onClick={executeLogin("test", "test123")}>로그인</button>
            {localStorage.key("jwt") ? <h1>${localStorage.key("jwt")}</h1> : <h1>읎어요</h1>}

        </div>
    )

}

export default Login;