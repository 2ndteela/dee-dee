import React, { Component } from 'react'
import './style.css'
import firebase from '../../../fire'



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

    sortSpells(sort) {
        let temp = this.state.guy.spells
        if(sort === 'All') {
            temp = temp.sort((a,b) => {
                if(a.lvl === "Cantrip") return -1
                else if (b.lvl === 'Cantrip') return 1
                return parseInt(a.lvl, 10) - parseInt(b.lvl, 10)
            })
        }
        else if (sort === 0) {
            temp = temp.filter((a) => {
                if(a.lvl === 'Cantrip') {
                    return true
                } 
                return false
            })
        }
        else {
           temp = temp.filter((a) => {
                if(parseInt(a.lvl, 10) === parseInt(sort, 10)) {
                    return true
                } 
                return false
            })
        }
        this.setState({
            spellArray: temp
        })
    }

    restUp() {
        let temp = this.state.guy
        temp.currentHealth = this.state.guy.health
        temp.tempHealth = 0

        this.state.guy.spellSlots.forEach(slot => {
            slot.used = 0
        });

        this.setState({
            guy: temp
        })
    }

    spells () { 
        if(this.state.guy.spells.length) {
            return (
                <div id='magic-head-wrapper'>
                <div id='magic-head'><h2>Spells</h2> <span>Save DC: {this.state.guy.spellSave}</span></div>
                <div id='spell-sort-buttons'>
                    <button id='all-spells' onClick={() => this.sortSpells('All')}>All</button>
                    {this.state.guy.spellSlots.map((slot, itr) => {
                        if(slot.lvl === 'Cantrips:') return <button onClick={() => this.sortSpells(itr)}>Cant.</button>
                        return <button onClick={() => this.sortSpells(itr)}>Lvl {itr}</button>
                    })}
                    
                </div>
                <div id='magic-bois'>
                    {this.state.spellArray.map((thing, itr) => {
                        if(thing.prep) {
                        return (
                            <div className='spell-deets' key={itr + 'qq'} onClick={(itr) => this.toggleExp(itr)} >
                                <div className='spell-header'>
                                    <h3>{thing.name}</h3>
                                    <h3>{thing.dmg}</h3>
                                </div>
                                <div className='expansion-pannel' >
                                    <h4>Level: {thing.lvl}</h4>
                                    <span className='spell-des'>{thing.des}</span>
                                </div>
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

    toggleExp(num) {
        console.log('expanding ' + num)

        const temp = this.state.spellArray

        if(temp[num].expanded) temp[num].expanded = false
        else temp[num].expanded = true

        this.setState({
            spellArray: temp
        })

    }
    
    incSlot(itr) {
        let temp = this.state.guy
        if(parseInt(temp.spellSlots[itr].used, 10) === parseInt(temp.spellSlots[itr].num, 10)) return
        temp.spellSlots[itr].used++

        this.setState({
            guy: temp
        })
    }

    decSlot(itr) {
        let temp = this.state.guy
        if(parseInt(temp.spellSlots[itr].used, 10) === 0) return
        temp.spellSlots[itr].used--

        this.setState({
            guy: temp
        })
    }

    slots (stuff) {
        if(stuff.length) {
            return (
                <div id='them-slots'>
                    <h2>Spell Slots</h2>
                    <div id='slot-list'>
                    {stuff.map((thing, itr) => {
                        if(thing.lvl === 'Cantrips:') { return null }
                        const wide = (thing.used / thing.num) * 100
                        const style = {
                            width: wide + '%',
                            backgroundColor: 'lightgrey'
                        }
                        if(wide <= 50 ) style.backgroundColor = 'lightgrey'
                        else if (wide > 50 ) style.backgroundColor = 'Grey'
                        if (wide === 100) style.backgroundColor = 'Black'
                        return (
                            <div key={itr + 'd'} className="spell-container">
                                <span>{thing.lvl} {thing.used} / {thing.num} </span>
                                <div className="spell-buttons" >
                                <div className="spell-button" onClick={() => this.decSlot(itr)}>-</div>
                                        <span className="spell-progess-container">
                                            <span className="spell-progess" style={style} ></span>
                                        </span>
 
                                    <div className="spell-button" onClick={() => this.incSlot(itr)} >+</div>
                                </div>

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

            this.setState({
                guy: temp,
                health: temp.health,
                tempHealth: temp.tempHealth,
                slots: temp.spellSlots,
                spellArray: temp.spells,
                spellSort: 'All'
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
                    {this.spells()}
                    {this.slots(this.state.guy.spellSlots)}
                    <button className='full-width' id='long-rest' onClick ={() =>this.restUp()} >Long Rest</button>
            </div>
        )
    }
    else return <h1>Loading</h1>
    }
}

export default Fight