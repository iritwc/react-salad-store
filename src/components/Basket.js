import React from 'react';
import {withRouter, NavLink, Link} from "react-router-dom";

export function Basket(props) {
  const {order, total} = props;
  const orderKeys = Object.keys(order);

  const handleDelete = (name)=>{
    const {onDelete} = props;
    if (onDelete) { onDelete({name})}
  };
  const handleAdd = (name)=>{
    const {onAdd} = props;
    if (onAdd) { onAdd({name})}
  };

  return (<div className="basket">
    <h4>Basket</h4>
    <ul key="order">
      {
        orderKeys.map((name, index) =>
          <li key={index} >{name}
            <button onClick={e => handleDelete(name)}>-</button>
            <span>{order[name].count}</span>
            <button onClick={e => handleAdd(name)}>+</button></li>
        )
      }
    </ul>
    <div className="total">Total: <em>{total}</em></div>
  </div>);
}

//activeClassName="selected"
export const NavLinkButton = function(props){
  const {text, to} = props;
  return (<NavLink className="nav-link" to={to} >
    {text}
  </NavLink>);
};

export const NextButton = function(props) {
  const {text, path} = props;
  return (<Link to={path} >{text}</Link>);
};
export const FinishButton2 = withRouter(
  ({ history }) =>
    <button onClick={() => {
      setTimeout(() => history.push("/store"), 100);
    }}
            >Finish</button>
);