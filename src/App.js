import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, NavLink, Route} from 'react-router-dom'
import Home from './comps/home'
import NewCharacter from './comps/new-character'

const Selecting = () => (
  <h1>character select</h1>
)

class App extends Component {
  render() {
    if(window.innerWidth < 1024) {
    return (
      <Router>
        <div>
          <div className="App">
            <Route exact path='/' component={Home} />
            <Route path='/character-select' component={Selecting} />
            <Route path='/character-new' component={NewCharacter} />
          </div>
          <div id='linx'>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/character-select'>Select</NavLink>
            <NavLink to='/character-new'>New</NavLink>
          </div>
        </div>
      </Router>
    )
  }
  return (
    <div className="App">
      <h1>Big App</h1>
    </div>
  )
  }
}

export default App;
