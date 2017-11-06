import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import './style.css'

class Selector extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: null
        }
    }

    componentDidMount() {
        console.log(this.props.url.match.params.password)
        const word = this.props.url.match.params.password
        const array = localStorage.getItem(word)
        if(array) {
            const useful = JSON.parse(array)
            this.setState({
                list: useful
            })
            console.log(useful)
        }
        else {
            this.setState.list = null
        }

    }

    render() {
        const param = this.props.url.match.params.password
        if(this.state.list) {
            return(
                <div>
                    <h1 className='header'>Charaters</h1>
                    <div id='select-list'>
                        {this.state.list.map((data, itr) => {
                            console.log(data)
                            return <NavLink key ={itr} className='selectable' to={`/character/${param}/${itr}`} ><span>{data.name}</span><span>{data.race} {data.class}</span></NavLink>
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

export default Selector