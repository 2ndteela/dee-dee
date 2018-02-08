import React, { Component } from 'react'
import './style.css'
import firebase from '../../../fire'

const spells = (stuff, save) => { 
    if(stuff.length) {
        return (
            <div id='magic-head-wrapper'>
            <div id='magic-head'><h2>Spells</h2> <span>Save DC: {save}</span></div>
            <div id='magic-bois'>
                {stuff.map((thing, itr) => {
                    if(thing.prep) {
                    return (
                        <div className='spell-deets' key={itr + 'qq'}>
                            <div className='spell-header'>
                                <h3>{thing.name}</h3>
                                <h3>{thing.dmg}</h3>
                            </div>
                            <h4>Level: {thing.lvl}</h4>
                            <span className='spell-des'>{thing.des}</span>
                        </div>
                    )
                }
                else return null
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
        this.state = {
            guy : null,
            health: 20,
            tempHealth: 20,
            slots: []
        }
    }

    slots (stuff) {
        if(stuff.length) {
            return (
                <div id='them-slots'>
                    <h2>Spell Slots</h2>
                    <div id='slot-list'>
                    {stuff.map((thing, itr) => {
                        return (
                        <div key={itr + 'd'}>
                            <h3>{thing.lvl}</h3>
                            <span className='slot-input'>
                                <input value ={thing.used} onChange={()=>this.updateSlot(itr)} />
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
    
    updateHealth() {
        const thing = document.getElementById('healthy').value
        let temp = this.state.guy
        if(thing) {
            temp.currentHealth = parseInt(thing, 10)
        }
        else {
            temp.currentHealth = 0
        }
        this.setState({
            guy: temp
        })
    }

    updateSlot(itr) {
        const tempSlot = document.querySelectorAll('.slot-input')[itr].childNodes[0]
        const tempVal = tempSlot.value
        const temp = this.state.guy
        temp.spellSlots[itr].used = tempVal
        this.setState({
            guy: temp
    })
    }
 
    updateTemp() {
        this.setState({
            tempHealth: document.getElementById('temp-health').value
        })
    }

    componentWillMount() {
        var fireRef = firebase.database().ref(`characters/${this.props.id}`)
        fireRef.on('value', (snapshot) => {
            let temp = snapshot.val()
            if(!temp.spells) temp.spells = []
            if(!temp.spellSlots) temp.spellSlots = []
            console.log(temp)
            this.setState({
                guy: temp,
                health: temp.health,
                tempHealth: temp.tempHealth,
                slots: temp.spellSlots
            })
        })
    }

    componentWillUnmount () {
        firebase.database().ref(`characters/${this.props.id}`).update({
            currentHealth: this.state.guy.currentHealth,
            tempHealth: this.state.tempHealth,
            spellSlots: this.state.guy.spellSlots
        })
    }

    render() {
        if(this.state.guy) {
        return (
            <div id='fight-container'>
                <div className='fancies-container'>
                    <div className='fancy-health-div'>
                        <div>
                            <input type='text' id='healthy' value={this.state.guy.currentHealth} onChange={()=>this.updateHealth()}/> 
                            <span id='current-health'>/ {this.state.guy.health}</span>
                        </div>
                        <span>Health</span>
                    </div>
                    <div className='fancy-health-div'>
                        <div>
                            <input value={this.state.tempHealth} id='temp-health' onChange={()=>this.updateTemp()} type='text'/> 
                        </div>
                        <span>Temp HP</span>
                    </div>
                </div>
                <div className='fancies-container' id='three-stats'>
                    <div>
                        <p>{this.state.guy.ac}</p>
                        <span>AC</span>
                    </div>
                    <div>
                        <p>{this.state.guy.initiative}</p>
                        <span>Initiative</span>
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
                        <div key={data.bonus + 1} className='weapon-info'>
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
    else return <h1>Loading</h1>
    }
}

export default Fight