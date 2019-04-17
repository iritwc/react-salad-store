import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink , Switch, Redirect } from "react-router-dom";
import './App.css';
import { Salad } from './components/Salad';
import {NavLinkButton} from "./components/Basket";

function Home() {
  return <div><h2>Welcome!</h2><NavLinkButton to="/store" text="Order a salad" /></div>;
}

function NoMatch({ location }) {
  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}

function Store({ match }) {
  return (
    <div className="Store">
      <h2>Order a Salad</h2>
      <nav>
        <div>
          <NavLink to={`${match.url}/ingredients`} activeClassName={'selection'}>ingredients</NavLink>
        </div>
        <div>
          <NavLink to={`${match.url}/checkout`}  activeClassName={'selection'}>checkout</NavLink>
        </div>
        <div>
          <NavLink to={`${match.url}/summary`}  activeClassName={'selection'}>summary</NavLink>
        </div>
      </nav>

      <Switch>
        <Redirect exact from={`${match.url}`} to={`${match.url}/ingredients`} />
        <Route path={`${match.url}/:action`} component={Salad} />
      </Switch>
    </div>
  );
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/store" component={Store} />
            {/* when none of the above match, <NoMatch> will be rendered */}
            <Route component={NoMatch} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
