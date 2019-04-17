import React, { Component } from 'react';
import {Redirect}  from "react-router-dom";

export class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      notes: '',
      redirectToReferrer: false
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    alert("You have chose to checkout with email "+ this.state.email);
    event.preventDefault();
    // event.target.reset();
    this.setState({redirectToReferrer: true});
  }

  render(){
    const { email, name, notes, redirectToReferrer } = this.state;

    if (redirectToReferrer) return <Redirect to={{ pathname: "/store/summary" }} />;

    return <div className="checkout">
      <h3>Checkout</h3>
      <form onSubmit={e=>this.handleSubmit(e)}>
        <label>
          Name:
          <input type="text" value={name} name="name" onChange={e=>this.handleChange(e)} required />
        </label>
        <label>
          Email:
          <input type="text" value={email} name="email" onChange={e=>this.handleChange(e)} required />
        </label>
        <label>
          Notes:
          <textarea value={notes} name="notes" onChange={e=>this.handleChange(e)} />
        </label>
        <input type="submit" value={"Confirm"} onClick={e=>{console.log('on input click');}} />
        {/*<SubmitButton />*/}
      </form>
    </div>;
  }
}
