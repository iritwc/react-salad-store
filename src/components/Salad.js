import React, { Component } from 'react';
import {Ingredients} from "./Ingredients";
import {SALAD} from "../assets/salad";
import {Checkout} from "./Checkout";
import {Basket, NavLinkButton} from './Basket';
import {Summary} from "./Summary";

export class Salad extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ingredients: SALAD.items,
      order: {}, // typeof {[name]: {price, count}}
      total: 0,
    }
  }
  getTotalOrder({name, price = 0}) {
    const {order} = this.state;
    console.log('get total order = ', order, price);
    const orderKeys = Object.keys(order);
    let total = price + orderKeys.reduce((prev, current)=> {
      return prev + order[current].count*order[current].price;
    }, 0);
    total = total.toFixed(2);
    return total;
  }
  handleSelect({name, price}) {
    const {order} = this.state;
    console.log(order);
    let count = (order[name])? order[name].count : 0;
    const _price = price || ((order[name])? order[name].price : 0);
    const total = this.getTotalOrder({name, price:_price});

    this.setState ({
      total,
      order: Object.assign({}, order, {[name]: {price: _price, count: ++count}},
      )});
  }
  handleDelete({name}){
    const {order, total} = this.state;
    let item = order[name];

    if (item) {
      let newItem =  Object.assign({}, item);
      let count = newItem.count;
      count--;
      const price = newItem.price*(-1);
      let _total = total;
      if (count >= 0) {
        newItem.count = Math.max(0, count);
        _total = this.getTotalOrder({price});
      } // else - no update

      this.setState({
        order: Object.assign({}, order, {[name]: newItem}),
        total: _total
      });
    }
  }
  renderAction(action) {
    const { ingredients, order } = this.state;
    switch(action) {
      case 'ingredients':
        return <Ingredients onSelect={(e) => this.handleSelect(e)} ingredients={ingredients} />;
      case 'checkout':
        return <Checkout />
      case 'summary':
        return <Summary order={order} />;
      default:
        return null;
    }
  }
  render() {
    const { match } = this.props;
    const { total, order } = this.state;

    return (<div>
      {
        this.renderAction(match.params.action)
      }
      <Basket
        total={total}
        order={order}
        onDelete={e=>this.handleDelete(e)}
        onAdd={e=>this.handleSelect(e)}>
      </Basket>
      <NavLinkButton to="/store" text="Start a new Salad" />
    </div>)
  }
}