// import React, {useEffect, useState} from "react";
// import axios from "axios";
// import {Form} from "react-bootstrap";
//
// function StorePage() {
//     return (
//         <Form>
//             <h1>Store Details</h1>
//             테스트
//         </Form>
//     );
// }
//
// export default StorePage;
//
//
// import React, {useEffect, useState} from 'react';
// import axios from 'axios';
// import { Table } from 'react-bootstrap';
// import { Button, Form } from 'react-bootstrap';
// import StorePage from "./components/StorePage";
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import { Container } from 'react-bootstrap';
//
// function App() {
//     const [store, setData] = useState([]);
//     useEffect(() => {
//             axios.get('/store/all')
//                 .then(response => {
//                     setData(response.data);
//                     console.log(response.data);
//                 })
//                 .catch(error => {
//                     console.log(error);
//                 })
//         },
//         []);
//     return (
//         <Container>
//             <Router>
//                 <Routes>
//                     <Route path='/'>
//                         <Store/>
//                     </Route>
//                     <Route path='/Store'></Route>
//                 </Routes>
//             </Router>
//         </Container>
//     );
// }
//
// function Store(){
//     return (
//         <div>
//             테스트
//         </div>
//     );
// }
//
// export default App;

import React from 'react';

function StorePage(props) {
    return (
        <>
            <h1>헤더입니다.</h1>
        </>
    );
}

export default StorePage;