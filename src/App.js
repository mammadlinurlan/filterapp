import './App.css';
import React, { createContext, useEffect, useMemo } from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { Phone } from './components/Phone.tsx'
import 'bootstrap/dist/css/bootstrap.min.css'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { Update } from './components/Update.tsx';
import { PhoneContext } from './hooks';
import { Add } from './components/Add.tsx';

function App() {

  const [phones, setPhones] = React.useState([]);
  const [min, setMin] = React.useState(0);
  const [max, setMax] = React.useState(5000);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(1);
  const [totalPage,setTotalPage] = React.useState(0)
  const getPhones = () => {
    axios.get('http://localhost:3000/all').then(({ data }) => {
      setPhones(data);
    })
  }

  useEffect(() => {

    axios.get('http://localhost:3000/all')
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

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
    axios.get('http://localhost:3000/all').then(({ data }) => {
      let filtered = data.filter((phone) => Number(phone.price) >= min && Number(phone.price) <= max)
      setPhones(filtered)
      console.log(filtered)
      setCurrentPage(1)
      console.log(phones.length)
    })
  },
    [min, max])

  const perPageHandler = (e) => {
    setItemsPerPage(parseInt(e.target.value))
    setCurrentPage(1)
  }

  const computedRecords = (() => {
    let computed = phones;
    computed = computed.slice(
      (currentPage - 1) * itemsPerPage,
      (currentPage - 1) * itemsPerPage + itemsPerPage
    )
    return computed;
  })()
  const pageChangeHandler = (num) => {
      setCurrentPage(num)
  }

  useEffect(()=>{
   
    setTotalPage(Math.ceil(phones.length/itemsPerPage))
    // console.log(phones.length/itemsPerPage)
  },[computedRecords])

  // const computedRecords = useMemo(()=>{
  //   let computed = phones;
  //   computed = computed.slice(
  //     (currentPage-1)*itemsPerPage,
  //     (currentPage-1)*itemsPerPage + itemsPerPage
  //   )
  //   return computed;
  // },[phones])

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={
          <div className="App">
            <div className='container'>

              <Link to='./add'>Add new phone</Link>
              <select className="custom-select"
                onChange={(e) => perPageHandler(e)}
                value={itemsPerPage}
              >

                <option selected>Open this select menu</option>
                <option defalultvalue="1">1</option>
                <option defalultvalue="10">10</option>
                <option defalultvalue="15">15</option>
              </select>


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
                  computedRecords.map((phone) => {
                    
                      return (
                        <Phone
                          key={phone._id}
                          model={phone.model}
                          name={phone.brand}
                          img={phone.img}
                          ram={phone.ram}
                          price={phone.price}
                          id={phone._id}
                        />
                      )
                    
                    
                    
                  })
                 
                }
              </div>

              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  <li className={`page-item ${currentPage === 1 && 'disabled'} `}><button className="page-link" onClick={()=>pageChangeHandler(currentPage-1)}>Previous</button></li>
                  {
                    [...Array(totalPage).keys()].map((num)=>{
                      return(
                        <li className={`page-item ${num + 1 === currentPage && 'active'}`}><button onClick={()=>pageChangeHandler(num+1)} className="page-link" href="#">{num+1}</button></li>
                      )
                    })
                  }
                  <li className={`page-item ${currentPage === totalPage && 'disabled'} `}><button className="page-link" onClick={()=>pageChangeHandler(currentPage+1)}>Next</button></li>
                </ul>
              </nav>
            </div>
            
          </div>
        } />
        <Route path='/Update/:phoneId' element={
          <PhoneContext.Provider value={phones}>
            <Update />
          </PhoneContext.Provider>
        } />
        <Route path='/Add' element={
          <Add />
        } />
      </Routes>
    </Router>
  );
}

export default App;
