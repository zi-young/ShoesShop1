import React from 'react';
import { Link } from 'react-router-dom'; // React Router의 Link 컴포넌트를 불러옵니다.

function Card(props) {
  return (
    <div className="col-md-4">
      {/* 이미지를 클릭하면 해당 페이지로 넘어가는 Link를 사용합니다. */}
      <Link to={`/detail/${props.shoes.id}`}> {/* props.shoes.id를 사용 */}
        <img src={`https://codingapple1.github.io/shop/shoes${props.shoes.id}.jpg`} width="80%" alt={props.shoes.title} /> {/* alt 속성도 수정 */}
      </Link>
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
    </div>
  );
}

export default Card;