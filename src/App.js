import React,{ useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {appApi} from './adapters/axios';

function App() {

  useEffect(()=>{
    // const url = '/companies/list-by-exchange?ExchangeCode=NMS';
    // appApi
    // .get(url)
    // .then((resp) => {
    //   console.log(resp.data);
    // })
    // .catch((err) => {
    //   console.log(err);
    // });

  },[])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div>
            App running successfully!!!
      </div>
    </div>
  );
}

export default App;
