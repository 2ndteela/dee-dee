import React, { Component } from 'react'
import './style.css'

class Fight extends Component {
    constructor(props) {
        super(props)
        this.state = {
            guy : JSON.parse(localStorage.getItem('characters'))[this.props.index]
        }
    }
    render() {
        return (
            <div id='fight-container'>
                <div className='fancies-container'>
                    <div className='fancy-health-div'>
                        <div>
                            <input type='text'/> 
                            <span>/ {this.state.guy.health}</span>
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
                        <p>{this.state.guy.ac}</p>
                        <span>AC</span>
                    </div>
                    <div>
                        <p>{this.state.guy.initiavtive}</p>
                        <span>Initiavtive</span>
                    </div>
                    <div>
                        <p>{this.state.guy.speed}</p>
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
                    {this.state.guy.weapons.map((data,itr) => (
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