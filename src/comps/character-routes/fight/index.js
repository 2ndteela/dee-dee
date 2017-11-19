import React, { Component } from 'react'
import './style.css'

const spells = (stuff, save) => { 
    if(stuff) {
        return (
            <div id='magic-head-wrapper'>
            <div id='magic-head'><h2>Spells</h2> <span>Save DC: {save}</span></div>
            <div id='magic-bois'>
                {stuff.map((thing, itr) => {
                    return (
                        <div className='spell-deets' key={itr*8}>
                            <div className='spell-header'>
                                <h3>{thing.name}</h3>
                                <h3>{thing.dmg}</h3>
                            </div>
                            <span>{thing.des}</span>
                        </div>
                    )
                })}
            </div>
            </div>
        )
    }
    return null
}


class Fight extends Component {
    constructor(props) {
        super(props)
        const fighter = JSON.parse(localStorage.getItem('characters'))[this.props.index]
        this.state = {
            guy : fighter,
            health: fighter.currentHealth,
            tempHealth: fighter.tempHealth,
            slots: fighter.spellSlots
        }
    }

    updateHealth() {
        this.setState({
            health: document.getElementById('healthy').value
        })   
    }

    slots (stuff) {
        if(stuff) {
            return (
                <div id='them-slots'>
                    <h2>Spell Slots</h2>
                    <div id='slot-list'>
                    {stuff.map((thing, itr) => {
                        return (
                        <div key={itr*5}>
                            <h3>{thing.lvl}</h3>
                            <span className='slot-input'>
                                <input value ={thing.used} onChange={()=>this.updateHealth(itr)} />
                                <span>/ {thing.num}</span>
                            </span>
                        </div>
                        )
                    })}
                    </div>
                </div>
            )
        }
        else return null
    }
    
    updateHealth(num) {
        const thing = document.querySelectorAll('.slot-input')[num].childNodes[0]
        console.log(thing)
        let temp = this.state.slots
        temp[num].used = thing.value
        this.setState({
            slots: temp
        })
    }

    updateTemp() {
        this.setState({
            tempHealth: document.getElementById('temp-health').value
        })
    }

    componentWillUnmount () {
        let toWrite = JSON.parse(localStorage.getItem('characters'))
        toWrite[this.props.index] = this.state.guy
        toWrite[this.props.index].currentHealth = this.state.health
        toWrite[this.props.index].tempHealth = this.state.tempHealth
        toWrite[this.props.index].spellSlots = this.state.slots
        console.log(toWrite)
        localStorage.setItem('characters', JSON.stringify(toWrite))
    }

    render() {
        return (
            <div id='fight-container'>
                <div className='fancies-container'>
                    <div className='fancy-health-div'>
                        <div>
                            <input type='text' id='healthy' value={this.state.health} onChange={()=>this.updateHealth()}/> 
                            <span>/ {this.state.guy.health}</span>
                        </div>
                        <span>Health</span>
                    </div>
                    <div className='fancy-health-div'>
                        <div>
                            <input value={this.state.tempHealth} id='temp-health' onChange={()=>this.updateTemp()} type='text'/> 
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
                        <div key={data.bonus + 1}>
                            <span className='weapon-name'>{data.name}</span>
                            <span>{data.bonus}</span>
                            <span className='weapon-damage'>{data.damage}</span>
                        </div>
                    ))}
                </div>
                    {spells(this.state.guy.spells, this.state.guy.spellSave)}
                    {this.slots(this.state.guy.spellSlots)}
            </div>
        )
    }
}

export default Fight