import React, { Component } from 'react'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import store from '../../store'
import './style.css'

import Stats from '../character-routes/stats/index'
import Pack from '../character-routes/pack/index'
import Fight from "../character-routes/fight/index"
import EditPage from '../character-routes/edit/index'
import Roller from '../character-routes/roller/index'

class ViewCharater extends Component {
    constructor(props) {
        super(props)
        this.state = {
            char: null
        }
    }
    componentWillMount () {
        const guy = store.getState()
        this.setState({
            char: guy
        })
    }
    render() {
        if(window.innerWidth < 768) {
        return (
            <div>
                <h1 className='header'>{this.state.char.name}</h1>
                <NavLink id='go-back' to='/'>Home</NavLink>
                <Router>
                    <div>
                    <div id='character-view-card'>
                        <Route exact path='/character' component={Stats}/>
                        <Route path = '/character/pack' component={Pack} />
                        <Route path = '/character/fight' component={Fight} />
                        <Route path = '/character/edit' component={EditPage} />
                        <Route path = '/character/roll' component={Roller} />
                    </div>
                    <div id="character-tabs">
                        <NavLink to={`/character/`}>Stats</NavLink>
                        <NavLink to={`/character/pack`}>Pack</NavLink>
                        <NavLink to={`/character/roll`}>
                            <div id='roll-button'>
                                <div className='dot'></div>
                                <div className='dot'></div>
                                <div className='dot'></div>
                                <div className='dot'></div>
                                <div className='dot'></div>
                                <div className='dot'></div>
                            </div>
                        </NavLink>
                        <NavLink to={`/character/fight`}>Fight</NavLink>
                        <NavLink to={`/character/edit`}>Edit</NavLink>
                    </div>
                    </div>
                </Router>
            </div>
        )
    }
    return (
        <div>
            <div>
                <h1 className='header'>{this.state.char.name}</h1>
                <NavLink id='go-back' to='/'>Home</NavLink>
            </div>
            <div id='big-columns'>
                <Stats />
                <Pack />
                <Fight />
                <EditPage />
                <Roller />
            </div>
        </div>
    )
    }
}

export default ViewCharater