import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

export class Summary extends Component {
  render() {
    const {order={}} = this.props;
    let orderKeys = Object.keys(order).filter(key =>  order[key].count > 0);

    return(<div>
      <h3>Summary</h3>
      <ul key="summary">
        {
          orderKeys.map((name, index) => {
              const {price , count} = order[name];
              const sub = (price*count);
              return <li key={index}>{name} <span>{price}</span> * <span>{count}</span> = <span>{sub.toFixed(2)}</span></li>
            }
          )
        }
      </ul></div>)
  }
}