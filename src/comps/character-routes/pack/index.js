import React, { Component } from 'react'
import './style.css'

class Pack extends Component {
    render () {
        return(
            <div id="pack-div">
                <h1>Pack</h1>
                <textarea defaultValue={this.props.deets.pack}></textarea>
                <h1>Notes</h1>
                <textarea defaultValue={this.props.deets.notes}></textarea>
                <h1>Skills</h1>
                <div className='skill-div'>
                    {this.props.deets.skills.map((data, itr) => (
                    <div>
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