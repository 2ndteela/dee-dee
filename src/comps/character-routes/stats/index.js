import React, { Component } from 'react'
import './style.css'

class Stats extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            res: 20,
            show: false
        }
    }
    toggleRes(thing) {
        const box = document.getElementById('throw-result')
        const rando = Math.floor((Math.random() * 20) + 1)
        const temp = parseInt(thing) + parseInt(rando)
        console.log(`thing = ${thing} | rand0 = ${rando} | temp = ${temp}`)
        const view = !this.state.show
        if(this.state.show) {
            box.style.display = 'none'
        }
        else {
            box.style.display = 'flex'
        }
        this.setState({
            res: temp,
            show: view
        })
    }
    exitBox() {
        const box = document.getElementById('throw-result')
        if(this.state.show) {
            const view = !this.state.show
            box.style.display = 'none'
            this.setState({
                show: view
            })
        }
    }
    render () {
        const stats = this.props.deets.stats
        const deets = this.props.deets.deets
        return (
            <div onClick={() => this.exitBox()} id="stats-body">
                <h1>Stats</h1>
                <div className='main-stats'>
                    <div onClick={() => this.toggleRes(stats[0].num)}><span>Charisma</span><span>{stats[0].num}</span></div>
                    <div onClick={() => this.toggleRes(stats[1].num)}><span>Constitution</span><span>{stats[1].num}</span></div>
                    <div onClick={() => this.toggleRes(stats[2].num)}><span>Dexterity</span><span>{stats[2].num}</span></div>
                    <div onClick={() => this.toggleRes(stats[3].num)}><span>Intelligence</span><span>{stats[3].num}</span></div>
                    <div onClick={() => this.toggleRes(stats[4].num)}><span>Strength</span><span>{stats[4].num}</span></div>
                    <div onClick={() => this.toggleRes(stats[5].num)}><span>Wisdom</span><span>{stats[5].num}</span></div>
                </div>
                <h1>Skills</h1>
                <div className="main-stats">
                    <div onClick={() => this.toggleRes(deets[0].num)}><span>Acrobatics</span><span>{deets[0].num}</span></div>
                    <div onClick={() => this.toggleRes(deets[1].num)}><span>Animal Handling</span><span>{deets[1].num}</span></div>
                    <div onClick={() => this.toggleRes(deets[2].num)}><span>Arcana</span><span>{deets[2].num}</span></div>
                    <div onClick={() => this.toggleRes(deets[3].num)}><span>Atheltics</span><span>{deets[3].num}</span></div>
                    <div onClick={() => this.toggleRes(deets[4].num)}><span>Deception</span><span>{deets[4].num}</span></div>
                    <div onClick={() => this.toggleRes(deets[5].num)}><span>History</span><span>{deets[5].num}</span></div>
                    <div onClick={() => this.toggleRes(deets[6].num)}><span>Insight</span><span>{deets[6].num}</span></div>
                    <div onClick={() => this.toggleRes(deets[7].num)}><span>Intimidation</span><span>{deets[7].num}</span></div>
                    <div onClick={() => this.toggleRes(deets[8].num)}><span>Investigation</span><span>{deets[8].num}</span></div>
                    <div onClick={() => this.toggleRes(deets[9].num)}><span>Medicine</span><span>{deets[9].num}</span></div>
                    <div onClick={() => this.toggleRes(deets[10].num)}><span>Nature</span><span>{deets[10].num}</span></div>
                    <div onClick={() => this.toggleRes(deets[11].num)}><span>Perception</span><span>{deets[11].num}</span></div>
                    <div onClick={() => this.toggleRes(deets[12].num)}><span>Performance</span><span>{deets[12].num}</span></div>
                    <div onClick={() => this.toggleRes(deets[13].num)}><span>Persuasion</span><span>{deets[13].num}</span></div>
                    <div onClick={() => this.toggleRes(deets[14].num)}><span>Religion</span><span>{deets[14].num}</span></div>
                    <div onClick={() => this.toggleRes(deets[15].num)}><span>Sleight of Hand</span><span>{deets[15].num}</span></div>
                    <div onClick={() => this.toggleRes(deets[16].num)}><span>Stealth</span><span>{deets[16].num}</span></div>
                    <div onClick={() => this.toggleRes(deets[17].num)}><span>Survival</span><span>{deets[17].num}</span></div>
                </div>
                <div id="throw-result">
                    {this.state.res}
                </div>
            </div>
        )
    }
}

export default Stats