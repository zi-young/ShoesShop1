import './App.css';
import {Navbar, Container, Nav} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { createContext, useEffect, useState } from 'react';
import data from './data.js'
import Card from './Components/Card';
import Detail from './pages/Detail';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import axios from 'axios'
import Cart from './pages/Cart.js';
import { useQuery } from 'react-query';

export let Context1 = createContext()

function App() {

  useEffect(()=>{
    localStorage.setItem('watched', JSON.stringify([]))
  }, [])



  let obj = {name : 'kim'}
  localStorage.setItem('data', JSON.stringify(obj))
  let 꺼낸거 = localStorage.getItem('data')
  
  console.log(JSON.parse(꺼낸거).name);

  let [shoes, setShoes] = useState(data);
  let [재고] = useState([10, 11, 12]);
  let navigate = useNavigate();

  let result = useQuery('작명', ()=>{
    axios.get('https://codingapple1.github.io/userdata.json').then((a)=>{
      console.log('요청됨')
      return a.data
    })
  })


  return (
    <div className='App'>
      <Navbar bg="light" variant="light">
        <Container>
        <Navbar.Brand onClick={()=>{ navigate('/') }}>Navbar</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link onClick={()=>{ navigate('/') }}>Home</Nav.Link>
          <Nav.Link onClick={()=>{ navigate('/cart') }}>Cart</Nav.Link>
        </Nav>
        <Nav className='ms-auto'>
          { result.isLoading && '로딩중' }  
          { result.error && '에러남' }
          { result.data && result.data.name }
        </Nav> 
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={
          <>
            <div className='main-bg'></div>
            <div className="container">
              <div className="row">
              {
                  shoes.map((shoes, i) => (
                    <Card key={i} shoes={shoes} i={i + 1} />
                  ))
              } 
              </div>
          </div>
          <button onClick={()=>{
            axios.get('https://codingapple1.github.io/shop/data2.json')
            .then((result)=>{
              console.log(result.data)
              let copy = [...shoes, ...result.data]
              setShoes(copy)
            })
            .catch(()=>{
              console.log('실패함')
            })
          }}>버튼</button>
          </>
        } />

      <Route path="/detail/:id" element={
        <Context1.Provider value={{ 재고 }}>
          <Detail shoes={shoes} />
        </Context1.Provider>
      } />

      <Route path="/cart" element={ <Cart /> }></Route>
    </Routes>
   </div>
  );
}




export default App;
