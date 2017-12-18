import React, { Component } from 'react'
import './style.css'
import store from '../../../store'

let mods

class Stats extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            res: 20,
            show: false,
            guy: store.getState()
        }
    }
    toggleRes(thing) {
        const box = document.getElementById('throw-result')
        const rando = Math.floor((Math.random() * 20) + 1)
        const temp = parseInt(thing, 10) + parseInt(rando, 10)
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

    proStat(thing) {
        const withPro = parseInt(this.state.guy.prof, 10) + parseInt(thing.num, 10)
        if(thing.pro) {
            let mod = Math.floor((parseInt(withPro, 10) -10) /2)
            if (mod >= 0) {
                mod = '+' + mod
            }
            return (
                <span>{withPro} (<span className='mod-val'>{mod}</span>)</span>
            )
        }
        let mod = Math.floor((parseInt(thing.num, 10) -10) /2) 
        if (mod >= 0) {
            mod = '+' + mod
        }
        return <span>{thing.num} (<span className='mod-val'>{mod}</span>)</span>
    }
    componentDidMount () {
        mods = document.querySelectorAll('.mod-val')
        
        const all = document.querySelectorAll('.main-stats')[1].childNodes
        for(let i = 0; i < all.length; i++) {
            if(this.state.guy.deets[i].pro) {
                all[i].classList.add('good')
            }
        }
    }

    render () {
        const stats = this.state.guy.stats
        const deets = this.state.guy.deets

        return (
            <div onClick={() => this.exitBox()} id="stats-body">
                <h1>Stats</h1>
                <div className='main-stats'>
                    <div onClick={() => this.toggleRes(mods[0].innerHTML)}><span>Charisma</span>{this.proStat(stats[0])}</div>
                    <div onClick={() => this.toggleRes(mods[1].innerHTML)}><span>Constitution</span>{this.proStat(stats[1])}</div>
                    <div onClick={() => this.toggleRes(mods[2].innerHTML)}><span>Dexterity</span>{this.proStat(stats[2])}</div>
                    <div onClick={() => this.toggleRes(mods[3].innerHTML)}><span>Intelligence</span>{this.proStat(stats[3])}</div>
                    <div onClick={() => this.toggleRes(mods[4].innerHTML)}><span>Strength</span>{this.proStat(stats[4])}</div>
                    <div onClick={() => this.toggleRes(mods[5].innerHTML)}><span>Wisdom</span>{this.proStat(stats[5])}</div>
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