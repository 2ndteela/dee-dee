import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Home from './comps/home'
import NewCharacter from './comps/new-character'
import SelectCharacter from './comps/select-character/index'
import viewCharacter from './comps/view-character/index'

const Selecting = (props) => (
  <SelectCharacter url={props} />
)

class App extends Component {

  componentDidMount() {
  }

  render() {
    if(window.innerWidth < 1024) {
    return (
      <Router>
        <div>
          <div className="App">
            <Route exact path='/' component={Home} />
            <Route path='/character-select/:password' component={Selecting} />
            <Route path='/character-new' component={NewCharacter} />
            <Route path='/character' component={viewCharacter} />
          </div>
        </div>
      </Router>
    )
  }
  return (
    <div className="App">
            <Router>
        <div>
          <div className="App">
            <Route exact path='/' component={Home} />
            <Route path='/character-select/:password' component={Selecting} />
            <Route path='/character-new' component={NewCharacter} />
            <Route path='/character' component={viewCharacter} />
          </div>
        </div>
      </Router>
    </div>
  )
  }
}

export default App;
