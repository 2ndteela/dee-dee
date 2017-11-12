import React, { Component } from 'react'
import './style.css'

class Fight extends Component {
    render() {
        console.log(this.props.deets)
        return (
            <div id='fight-container'>
                <div className='fancies-container'>
                    <div className='fancy-health-div'>
                        <div>
                            <input type='text'/> 
                            <span>/ {this.props.deets.health}</span>
                        </div>
                        <span>Health</span>
                    </div>
                    <div className='fancy-health-div'>
                        <div>
                            <input defaultValue='0' type='text'/> 
                        </div>
                        <span >Temp HP</span>
                    </div>
                </div>
                <div className='fancies-container' id='three-stats'>
                    <div>
                        <p>{this.props.deets.ac}</p>
                        <span>AC</span>
                    </div>
                    <div>
                        <p>{this.props.deets.initiavtive}</p>
                        <span>Initiavtive</span>
                    </div>
                    <div>
                        <p>{this.props.deets.speed}</p>
                        <span>Speed</span>
                    </div>
                </div>
                <h2>Weapons</h2>
                <div className='fight-list'>
                    <div className='list-header'>
                        <span className='weapon-name'>Name</span>
                        <span>Bns</span>
                        <span className='weapon-damage'>Damage</span>
                    </div>
                    {this.props.deets.weapons.map((data,itr) => (
                        <div>
                            <span className='weapon-name'>{data.name}</span>
                            <span>{data.bonus}</span>
                            <span className='weapon-damage'>{data.damage}</span>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default Fight