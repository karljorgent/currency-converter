import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
import useFetch from "react-fetch-hook";

function App() {

    const [rates, setRates] = useState([]);

    useEffect(() => {
          fetch('http://localhost:8800/currencies')
              .then(response => {return response.json()})
              .then(response => {
                  setRates(response)
                  ;
              })
    })



    return (
        <div className="App">
            <h1>lol</h1>
        </div>
    );
}

export default App;
