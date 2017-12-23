import React, { Component } from 'react'
import { BrowserRouter as Router, Route, NavLink, withRouter } from 'react-router-dom'
import './style.css'
import firebase from '../../fire'

import Stats from '../character-routes/stats/index'
import Pack from '../character-routes/pack/index'
import Fight from "../character-routes/fight/index"
import EditPage from '../character-routes/edit/index'
import Roller from '../character-routes/roller/index'

var ID

const mainPage = (ID) => {
    const temp = ID.match.params.id
return (
    <div id='main-page-div'>
        <Stats id={temp} />
        <Pack id={temp} />
        <Fight id={temp} />
    </div>
)}

class ViewCharater extends Component {
    constructor(props) {
        super(props)
        this.state = {
            char: null
        }
        ID = window.location.href.split('/')[4]
    }

    componentWillMount() {
        var fireRef = firebase.database().ref(`characters/${ID}`)
        fireRef.on('value', (snapshot) => {
            this.setState({
                char: snapshot.val(),
                id: snapshot.key
            })
        })
    }

    render() {
        if(this.state.char) {
        if(window.innerWidth < 768) {
        return (
            <div>
                <h1 className='header'>{this.state.char.name}</h1>
                <NavLink id='go-back' to='/'>Home</NavLink>
                <Router>
                    <div>
                    <div id='character-view-card'>
                        <Route exact path='/character/:id' component={Stats}/>
                        <Route path = '/character/:id/pack' component={Pack} />
                        <Route path = '/character/:id/fight' component={Fight} />
                        <Route path = '/character/:id/edit' component={EditPage} />
                        <Route path = '/character/:id/roll' component={Roller} />
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
            <div id='fixed-top'>
                <h1 className='header'>{this.state.char.name}</h1>
                <NavLink id='go-back' to='/'>Home</NavLink>
            </div>
            <Router>
                <div id='big-columns'>
                <NavLink id='go-edit' to={`/character/${this.state.id}/edit`}>Edit</NavLink>
                <NavLink id='go-main' to={`/character/${this.state.id}`}>Main Page</NavLink>
                    <Route exact path='/character/:id' component={mainPage} />
                    <Route path='/character/:id/edit' component={EditPage} />
                </div>
            </Router>
        </div>
    )
    }
    else return <h1>Loading</h1>
}
}

export default withRouter(ViewCharater)