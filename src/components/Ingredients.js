import React, { Component } from 'react';

export class Ingredients extends Component {

  handleClick(item) {
    this.props.onSelect(item);
  }
  render(){

    const {ingredients} = this.props;

    return (
      <div>
        <h3>Ingredients</h3>
        <ul className={'ingredients'} key="ingredients">
          {
            ingredients.map(({name,price}, index)=>
              <li key={index} onClick={() => this.handleClick({name, price})}>{name} <span>{price}</span></li> )
          }
        </ul>
      </div>
    )
  }
}

