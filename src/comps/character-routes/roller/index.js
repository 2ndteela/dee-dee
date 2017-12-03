import React, { Component } from 'react';
import './style.css';

export class Roller extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            current: 20,
            list: ['1','2','3','4','5','6','7','8','9','0', 'd', 'roll'],
            dee: false,
            string: '',
            rolls: []
         }
    }

    roll() {
        const array = this.state.string.split('d')
        if(array.length > 1) {
            let temp = 0
            const reps = parseInt(array[0], 10) 
            let rollsArray = []
            for(let i = 0; i < reps; i++) {
                const smallNum = Math.floor(Math.random() * array[1]) + 1
                rollsArray.push(smallNum)
                temp += smallNum
            }
            this.setState({
                current: temp,
                rolls: rollsArray
            })
        }
        else {
            const temp = Math.floor(Math.random() * array[0]) + 1
            this.setState({
                current: temp,
                rolls: []
            })
        }
    }

    deleteNum() {
        let temp = this.state.string.slice(0, this.state.string.length-1)
        const tempDee = temp.includes('d')
        this.setState({
            string: temp,
            dee:tempDee
        })
    }

    addNum(str) {
        if(str === 'roll') {
            this.roll()
        }
        else if (str === 'd') {
            if(this.state.dee) {
                return
            }
            else {
                let temp = this.state.string
                temp += str
                this.setState({
                    string: temp,
                    dee: true
                })
            }
        }
        else {
            let temp = this.state.string
            temp += str
            this.setState({
                string: temp
            })
        }
    }

    render() { 

        return (
            <div id="roll-container">
                <div id='roll-result'>
                    <h1>{this.state.current}</h1>
                    <div id='indi-rolls'>{
                        this.state.rolls.map((roll, itr) => <span key={itr +'r'}>{roll}</span>)
                    }</div>
                </div>
                <div id='roll-numbers-container'>
                    <span id='roll-numbers'>{this.state.string}</span>
                    <span id='clear-nums' onClick={()=> this.deleteNum()}>Del</span>
                </div>
                <div id='roll-buttons'>
                    {
                        this.state.list.map((num, itr) => {
                        return <div key={num +'k'} onClick={()=>this.addNum(num)} >{num}</div>
                    })}
                </div>
            </div>
          )
    }
}
 
export default Roller;