import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Nav } from 'react-bootstrap'
import { Context1 } from './../App.js'
import { addItem } from "../store.js";
import { useDispatch } from "react-redux";


function Detail(props){


  let [fade2, setFade2 ] = useState('')
  let [ alert, setAlert ] = useState(true)
  let [tap, setTap] = useState(0)
  let dispatch = useDispatch()



  useEffect(()=>{
    setFade2('end')
    return ()=>{
      setFade2('')
    }
  }, [])

  useEffect(() => {
    setTimeout(() => {setAlert(false)}, 2000);
  }, []);

  let {id} = useParams();
  let foundShoe  = props.shoes.find(function(x){
    return x.id === parseInt(id);
  });

  if (!foundShoe) {
    return <div>제품을 찾을 수 없습니다.</div>;
  }


  return (
    <div className={`container start ${fade2}`}>
        {
          alert === true
          ?  <div className="alert alert-warning">
          2초이내 구매시 할인
        </div>
        : null
        }
      
        <div className="row">
          <div className="col-md-6">
            <img src={`https://codingapple1.github.io/shop/shoes${foundShoe.id}.jpg`} width="80%" alt="Shoe" />
          </div>
          <div className="col-md-6">
            <h4 className="pt-5">{foundShoe.title}</h4>
            <p>{foundShoe.content}</p>
            <p>{foundShoe.price}원</p>
            <button className="btn btn-danger" onClick={()=>{
              dispatch(addItem( {id : 1, name : 'Red Knit', count : 1} ))
            }}>주문하기</button>
          </div>
        </div>
        <br />
          <Nav variant="tabs"  defaultActiveKey="link0">
            <Nav.Item>
              <Nav.Link onClick={()=>{ setTap(0) }} eventKey="link0">버튼0</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={()=>{ setTap(1) }} eventKey="link1">버튼1</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={()=>{ setTap(2) }} eventKey="link2">버튼2</Nav.Link>
            </Nav.Item>
        </Nav>
        <TabContent tap={tap} />

      </div>
  )
}
function TabContent({tap}){

  let [fade, setFade] = useState('')
  let {재고} = useContext(Context1)

  useEffect(()=>{
    let a = setTimeout(()=>{ setFade('end') }, 100)

    return ()=>{
      clearTimeout(a)
      setFade('')
    }
  }, [tap])

  return ( <div className={`start ${fade}`}>
   { [<div>{재고[0]}</div>, <div>{재고[1]}</div>, <div>내용2</div>][tap] }
  </div> )
}


export default Detail;