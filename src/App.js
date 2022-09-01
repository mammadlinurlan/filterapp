import './App.css';
import React, { createContext, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { Phone } from './components/Phone.tsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { Update } from './components/Update.tsx';
import { PhoneContext } from './hooks';

function App() {

  const [phones, setPhones] = React.useState([]);
  const [min, setMin] = React.useState(0);
  const [max, setMax] = React.useState(5000);

  const getPhones = () => {
    axios.get('api.json').then(({ data }) => {
      setPhones(data.phones);
    })
  }

  const maxInputHandler = (e) => {
    setMax(e.target.value);
  }
  const minInputHandler = (e) => {
    setMin(e.target.value);
  }

  useEffect(() => {
    getPhones();
  }, [])

  useEffect(() => {
    axios.get('api.json').then(({ data }) => {
      let filtered = data.phones.filter((phone) => Number(phone.price) >= min && Number(phone.price) <= max)
      setPhones(filtered)
    })
  },
    [min, max])

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={
          <div className="App">
            <div className='container'>
              <div className='slider'>
                <div className='min'>
                  <input onChange={(e) => minInputHandler(e)} value={min} min="0" max="10000" type="range" />
                  Min : {min}
                </div>
                <div className='max'>
                  <input onChange={(e) => maxInputHandler(e)} value={max} min="300" max="10000" type="range" />
                  Max : {max}
                </div>
              </div>
              <div className='row'>
                {
                  phones.map((phone) => {
                    return (
                      <Phone
                        key={phone.id}
                        name={phone.name}
                        img={phone.img}
                        ram={phone.ram}
                        price={phone.price}
                        id={phone.id}
                      />
                    )
                  })
                }
              </div>
            </div>
          </div>
        } />
        <Route path='/Update/:phoneId' element={
          <PhoneContext.Provider value={phones}>
            <Update />
          </PhoneContext.Provider>
        } />
      </Routes>
    </Router>
  );
}

export default App;
