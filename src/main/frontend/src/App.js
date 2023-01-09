import React, {useEffect, useLayoutEffect, useState} from 'react';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import StorePage from "./components/StorePage";

function App() {
  const [store, setData] = useState([]);
    useEffect(() => {
          axios.get('/store/all')
              .then(response => {
                  setData(response.data);
                  console.log(response.data);
              })
              .catch(error => {
                  console.log(error);
              })
      },
      []);
  return (
      <Form>
          <h1>Store Details</h1>
          StoreID: {JSON.stringify(store[0]) && JSON.stringify(store[0]["store_id"])}<p></p>
          StoreName: {JSON.stringify(store[0]) && JSON.stringify(store[0]["store_name"])}<p></p>
      </Form>
  );
}

// let test = document.querySelector({test})
// test.create

export default App;