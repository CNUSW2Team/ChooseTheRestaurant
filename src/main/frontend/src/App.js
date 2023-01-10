import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
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
          <h1>Stores</h1>
          <h1>Customer Table</h1>
          <Table striped bordered hover>
              <thead>
              <tr>
                  <th>id</th>
                  <th>name</th>
                  <th>address</th>
                  <th>phone_number</th>
                  <th>opening_hours</th>
              </tr>
              </thead>
              <tbody>
              {store.map(v =>
                  <tr>
                      <td>{v.store_id}</td>
                      <td>{v.store_name}</td>
                      <td>{v.address}</td>
                      <td>{v.phone_number}</td>
                      <td>{v.opening_hours}</td>
                      <td><Button onClick={StorePage}> 이동하기 </Button></td>
                  </tr>,
              )}
              </tbody>
          </Table>
          StoreID: {JSON.stringify(store[0]) && JSON.stringify(store[0]["store_id"])}<p></p>
          StoreName: {JSON.stringify(store[0]) && JSON.stringify(store[0]["store_name"])}<p></p>
          <img src={`/img/${store[0] && store[0]["store_id"]}.jpg`} />
      </Form>
  );
}

export default App;