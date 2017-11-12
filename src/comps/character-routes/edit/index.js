import React, { Component } from 'react'
import './style.css'

const details = [{attr: 3, name:'Acrobatics'}, {attr: 6, name:'Animal Handling'}, {attr: 4, name:'Arcana'}, {attr: 5, name:'Athletics'}, {attr: 1, name:'Deception'},
{ attr: 4, name:'History'}, {attr: 6, name:'Insight'}, {attr: 1, name: 'Intimidation'}, {attr: 4, name: 'Investigation'}, {attr: 6, name :'Medicine'},
{attr: 4, name: 'Nature'}, {attr: 6, name:'Perception'}, {attr: 1, name:'Performance'}, {attr: 1, name:'Persuasion'}, {attr: 4, name: 'Religion'}, {attr: 3, name:'Sleight of Hand'},
{attr: 3, name:'Stealth'}, {attr: 6, name:'Survival'}]


class EditPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            guy: JSON.parse(localStorage.getItem('characters'))[this.props.index]
        }
    }
    saveCharacter() {
        if (typeof(Storage) !== "undefined") {
            let current = localStorage.getItem('characters')
            let fullArray = JSON.parse(current, 10)
            fullArray[this.props.index] = this.state.guy
            console.log(this.state.guy)
            localStorage.setItem('characters', JSON.stringify(fullArray))
        } else {
            window.alert('You can not save because you need a newer browser. Use Chrome or Something')
            console.log('No storage for you :/')
        }
    }
    addSkill() {
        const daddy = document.getElementById('skills')
        const container = document.createElement('div')
        const input = document.createElement('input')
        const area = document.createElement('textarea')
        input.placeholder = 'Title'
        area.placeholder = 'Description'
        area.classList.add('short-area')
        container.classList.add('skill-area')
        container.appendChild(input)
        container.appendChild(area)
        daddy.appendChild(container)
    }

    removeSkill() {
        const over = document.getElementById('skills')
        const last = over.childNodes[over.childNodes.length - 1]
        over.removeChild(last)
    }

    addWeapon() {
        const container = document.createElement('div')
        container.classList.add('weapon-div')
        const weapon = document.createElement('input')
        const atk = document.createElement('input')
        const dmg = document.createElement('input')
        weapon.placeholder = 'Weapon'
        atk.placeholder = 'Atk Bns'
        dmg.placeholder = 'Damage'
        container.appendChild(weapon)
        container.appendChild(atk)
        container.appendChild(dmg)
        document.getElementById('weapons').appendChild(container)
    }
    removeWeapon() {
       const over = document.getElementById('weapons')
       const last = over.childNodes[over.childNodes.length - 1]
       over.removeChild(last)
    }
    addProThrow(num) {
        const displays = document.querySelectorAll('.throw-num')
        const prof = document.getElementById('prof').value
        if(prof) {
            let temp = parseInt(displays[num].innerHTML ,10)
            const test = displays[num].parentElement.classList.contains('proficient')
            let tempGuy = this.state.guy
            if(!test) {
                temp += parseInt(prof, 10)
                displays[num].innerHTML = temp
                displays[num].parentElement.classList.add('proficient')
                tempGuy.stats[num].pro = true

            }
            else {
                if(temp !== '' || !isNaN(temp)){
                    temp -= parseInt(prof, 10)
                } 
                displays[num].innerHTML = temp
                displays[num].parentElement.classList.remove('proficient')
                tempGuy.stats[num].pro = false
            }
            this.setState({
                guy: tempGuy
            })
            console.log(this.state.guy)
        }
    }
    addPro(num) {
        const displays = document.querySelectorAll('.deet-val')
        const prof = document.getElementById('prof').value
        if(prof) {
            let temp = parseInt(displays[num].innerHTML, 10)
            const test = displays[num].parentElement.classList.contains('proficient')
            if(!test) {
                temp += parseInt(prof, 10)
                displays[num].innerHTML = temp
                displays[num].parentElement.classList.add('proficient')
                const tempGuy = this.state.guy
                tempGuy.deets[num].num = temp;
                tempGuy.deets[num].pro = true;
                this.setState({
                    guy: tempGuy
                })
            }
            else {
                if(temp !== '' || !isNaN(temp)){
                    temp -= parseInt(prof, 10)
                } 
                displays[num].innerHTML = temp
                displays[num].parentElement.classList.remove('proficient')
                const tempGuy = this.state.guy
                tempGuy.deets[num].num = temp;
                tempGuy.deets[num].pro = true;
                this.setState({
                    guy: tempGuy
                })
            }
        }
        console.log(this.state.guy)
    }

    getValue (num) {

        const displays = document.querySelectorAll('.deet-val')
        const stats = document.getElementById('stats')
        const numbas = stats.querySelectorAll('input')
        let prof = document.getElementById('prof').value
        const throws = document.querySelectorAll('.throw-num')
            if(isNaN(prof)) prof = 0
            for(let i = 0; i < displays.length; i++) {
                let temp = Math.floor((parseInt(numbas[num-1].value, 10) - 10) /2)
                const withPro = parseInt(temp, 10) + parseInt(prof, 10)
                if(details[i].attr === num) {
                    if(numbas[num-1].value === '') {
                        displays[i].innerHTML = 0
                        throws[num-1].innerHTML = 0
                    }
                    else {
                        displays[i].innerHTML = temp 
                        if(displays[i].parentElement.classList.contains('proficient')) {

                            displays[i].innerHTML = withPro
                        }
                    }
                }
                throws[num-1].innerHTML = temp
                if(throws[num-1].parentElement.classList.contains('proficient') || this.state.guy.stats[num-1].pro ) {
                    throws[num-1].innerHTML = withPro
                    throws[num-1].parentElement.classList.add('proficient')
                }
            }
        }
        componentDidMount () {
            this.getValue(1)
            this.getValue(2)
            this.getValue(3)
            this.getValue(4)
            this.getValue(5)
            this.getValue(6)
            console.log(this.props.index)
        }

        checkDeet (thing) {
            console.log(thing)
            if(thing.pro) {
                return <span className='proficient'>{thing.num}</span>
            }
            
            else {
                return <span>{thing.num}</span>
            }
        }
    
        render () {
        return (
            <div>
            <div className ='col-12 full-pad new-char-card'>
                <div>
                    <h2>Basic Info</h2>
                    <input type='text' defaultValue={this.state.guy.name}/>
                    <input type='text' defaultValue={this.state.guy.race}/>
                    <input type='text' defaultValue={this.state.guy.class} className='half-wit first'/>
                    <input type='number' defaultValue={this.state.guy.level} className='half-wit '/>
                    <input type='number' defaultValue={this.state.guy.prof} id='prof' className='half-wit first'/>
                    <input type='number' defaultValue={this.state.guy.exp} className='half-wit'/>
                </div>
                <div id='stats'>
                    <h2>Stats</h2>
                    <input type='number' defaultValue={this.state.guy.stats[0].num} className='half-wit first' onChange={() => this.getValue(1)}/>
                    <input type='number' defaultValue={this.state.guy.stats[1].num} className='half-wit' onChange={() => this.getValue(2)}/>
                    <input type='number' defaultValue={this.state.guy.stats[2].num} className='half-wit first' onChange={() => this.getValue(3)}/>
                    <input type='number' defaultValue={this.state.guy.stats[3].num} className='half-wit'onChange={() => this.getValue(4)}/>
                    <input type='number' defaultValue={this.state.guy.stats[4].num} className='half-wit first' onChange={() => this.getValue(5)}/>
                    <input type='number' defaultValue={this.state.guy.stats[5].num} className='half-wit' onChange={() => this.getValue(6)}/>
                    <input type='number' defaultValue={this.state.guy.ac} className='third-wit' />
                    <input type='number' defaultValue={this.state.guy.speed} className='third-wit middle' />
                    <input type='number'defaultValue={this.state.guy.initiavtive} className='third-wit' />
                    <input type='number' defaultValue={this.state.guy.health} />
                </div>
                <div>
                    <h2>Saving Throws</h2>
                    <div >
                        <div className='throw half-wit first' onClick={() => this.addProThrow(0)}><span>Charisma</span><span className='throw-num'>0</span></div>
                        <div className='throw half-wit' onClick={() => this.addProThrow(1)} ><span>Constitution</span><span className='throw-num'>0</span></div>
                        <div className='throw half-wit first' onClick={() => this.addProThrow(2)}><span>Dexterity</span><span className='throw-num'>0</span></div>
                        <div className='throw half-wit' onClick={() => this.addProThrow(3)}><span>Intelligence</span><span className='throw-num'>0</span></div>
                        <div className='throw half-wit first' onClick={() => this.addProThrow(4)}><span>Strength</span><span className='throw-num'>0</span></div>
                        <div className='throw half-wit' onClick={() => this.addProThrow(5)}><span>Wisdom</span><span className='throw-num'>0</span></div>
                    </div>
                </div>
                <div>
                    <h2>Detail Stats</h2>
                    {details.map((thing, itr)=>{
                        return (
                            <div className='lil-deet' key={thing.name} onClick={()=> this.addPro(itr)}><span>{thing.name}: </span><span className='deet-val'>{this.checkDeet(this.state.guy.deets[itr])}</span></div>
                        )
                    }
                )}
                </div>
                <div className='center-div'>
                    <h2>Weapons</h2>
                    <div id='weapons'>
                        {this.state.guy.weapons.map((data, itr) => (
                            <div key={data.name} className='weapon-div'>
                                <input type='text' defaultValue={data.name} />
                                <input type='text' defaultValue={data.bonus}/>
                                <input type='text' defaultValue={data.damage}/>
                            </div>
                        ))}
                    </div>
                    <button onClick={() => this.addWeapon()}>Add Weapon</button>
                    <button onClick={() => this.removeWeapon()}>Remove Last</button>
                </div>
                <div className='center-div'>
                    <div id='skills'>
                        <h2>Skills and Attributes</h2>
                        {this.state.guy.skills.map((data, itr) => (
                            <div key={data.name} className='skill-area'>
                                <input defaultValue={data.name} />
                                <textarea defaultValue={data.des} className='short-area'/>
                            </div>
                        ))}
                    </div>
                    <button onClick={() => this.addSkill()}>Add New</button>
                    <button onClick={() => this.removeSkill()}>Remove Last</button>
                </div>
                <button onClick={()=>this.saveCharacter()}>Save Character</button>
            </div>
        </div>
        )
    }
}

export default EditPage;