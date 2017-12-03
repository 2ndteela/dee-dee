import React, { Component } from 'react'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import './style.css'

import Stats from '../character-routes/stats/index'
import Pack from '../character-routes/pack/index'
import Fight from "../character-routes/fight/index"
import EditPage from '../character-routes/edit/index'
import Roller from '../character-routes/roller/index'

let indexNum

const statCaller = () => <Stats index={indexNum} />
const packCaller = () => <Pack index={indexNum} />
const fightCaller = () => <Fight index={indexNum} />
const editCaller = () => <EditPage index={indexNum} />

class ViewCharater extends Component {
    constructor(props) {
        super(props)
        this.state = {
            char: null
        }
    }
    componentWillMount () {
        const list = JSON.parse(localStorage.getItem('characters'))
        const guy = list[this.props.match.params.index]
        indexNum = this.props.match.params.index
        this.setState({
            char: guy
        })
    }
    render() {

        return (
            <div>
                <h1 className='header'>{this.state.char.name}</h1>
                <NavLink id='go-back' to='/'>Home</NavLink>
                <Router>
                    <div>
                    <div id='character-view-card'>
                        <Route exact path='/character/:id' component={statCaller}/>
                        <Route path = '/character/:id/pack' component={packCaller} />
                        <Route path = '/character/:id/fight' component={fightCaller} />
                        <Route path = '/character/:id/edit' component={editCaller} />
                        <Route path = '/character/:id/roll' component={Roller} />
                    </div>
                    <div id="character-tabs">
                        <NavLink to={`/character/${this.props.match.params.index}`}>Stats</NavLink>
                        <NavLink to={`/character/${this.props.match.params.index}/pack`}>Pack</NavLink>
                        <NavLink to={`/character/${this.props.match.params.index}/roll`}>
                            <div id='roll-button'>
                                <div className='dot'></div>
                                <div className='dot'></div>
                                <div className='dot'></div>
                                <div className='dot'></div>
                                <div className='dot'></div>
                                <div className='dot'></div>
                            </div>
                        </NavLink>
                        <NavLink to={`/character/${this.props.match.params.index}/fight`}>Fight</NavLink>
                        <NavLink to={`/character/${this.props.match.params.index}/edit`}>Edit</NavLink>
                    </div>
                    </div>
                </Router>
            </div>
        )
    }
}

export default ViewCharater