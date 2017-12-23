import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import './style.css'
import firebase from '../../fire'
import {withRouter} from 'react-router-dom'
import store from '../../store'

class Selector extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: []
        }
        this.getParam = this.getParam.bind(this)
    }

    getParam() {
        return this.props.match.params.password
    }

    componentDidMount() {
        let fireRef = firebase.database().ref('characters')
        fireRef.orderByChild('password').equalTo(this.getParam()).on('child_added', snapshot => {
          let temp = this.state.list
          temp.push(snapshot.val())
          temp[temp.length-1]._id = snapshot.key
          this.setState({
              list: temp
          })  
        })
    }
    goto(itr) {
        const toSend = {
            type: 'SET_CHAR',
            payload: this.state.list[itr]
        }
        store.dispatch(toSend)
        this.props.history.push(`/character/${this.state.list[itr]._id}`)
    }

    render() {
        if(this.state.list.length) {
            return(
                <div>
                    <h1 className='header'>Charaters</h1>
                    <div id='select-list'>
                        {this.state.list.map((data, itr) => {
                            return <button key={itr} onClick={()=>this.goto(itr)} className='selectable'><span>{data.name}</span><span>{data.race} {data.class}</span></button>
                        })}
                    </div>
                </div>
            )
        }
        else {
            return <div><h2>No Charaters with that password found</h2><NavLink to='/'>Go Back</NavLink></div>
        }
    }
}

export default withRouter(Selector)