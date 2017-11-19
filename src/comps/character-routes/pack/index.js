import React, { Component } from 'react'
import './style.css'

class Pack extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            pack: JSON.parse(localStorage.getItem('characters'))[this.props.index].pack,
            notes: JSON.parse(localStorage.getItem('characters'))[this.props.index].notes,
            guy: JSON.parse(localStorage.getItem('characters'))[this.props.index]
        }
    }
    type(event, which) {
        if(which) {
            this.setState({
                pack: event.target.value
            })
        }
        else {
            this.setState({
                notes: event.target.value
            })
        }
    }
    componentWillUnmount() {
        const all = JSON.parse(localStorage.getItem('characters'))
        const tempGuy = all[0]
        tempGuy.notes = this.state.notes;
        tempGuy.pack = this.state.pack
        all[0] = tempGuy;
        localStorage.setItem('characters', JSON.stringify(all))
    }
    render () {
        return(
            <div id="pack-div">
                <h1>Pack</h1>
                <textarea defaultValue={this.state.pack} onChange={(event) => this.type(event, true)}></textarea>
                <h1>Notes</h1>
                <textarea defaultValue={this.state.notes} onChange={(event) => this.type(event, false)}></textarea>
                <h1>Skills</h1>
                <div className='skill-div'>
                    {this.state.guy.skills.map((data, itr) => (
                    <div key={itr}>
                        <h2>{data.name}</h2>
                        <p>{data.des}</p>
                    </div>
                    )
                )}
                </div>
            </div>
        )
    }
}

export default Pack