import React, { Component } from 'react'
import './style.css'
import firebase from 'firebase'

const details = [{attr: 3, name:'Acrobatics'}, {attr: 6, name:'Animal Handling'}, {attr: 4, name:'Arcana'}, {attr: 5, name:'Athletics'}, {attr: 1, name:'Deception'},
{ attr: 4, name:'History'}, {attr: 6, name:'Insight'}, {attr: 1, name: 'Intimidation'}, {attr: 4, name: 'Investigation'}, {attr: 6, name :'Medicine'},
{attr: 4, name: 'Nature'}, {attr: 6, name:'Perception'}, {attr: 1, name:'Performance'}, {attr: 1, name:'Persuasion'}, {attr: 4, name: 'Religion'}, {attr: 3, name:'Sleight of Hand'},
{attr: 3, name:'Stealth'}, {attr: 6, name:'Survival'}]

const statNames = ['Charisma', 'Constitution', 'Dexterity', 'Intelligence', 'Strength', 'Wisdom']

const proTitle = (word, isBlue, callback, idx) => {
    if(isBlue) return <div onClick={()=>callback(idx)} className='proficient'>{word}</div>
    return <div onClick={()=>callback(idx)}>{word}</div>
}

class EditPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            guy: null
        }
        this.toggleProStat = this.toggleProStat.bind(this)
    }
    saveCharacter() {
            const inputs = document.querySelectorAll('input')
            const weapons = document.querySelectorAll('.weapon-div')
            const skills = document.querySelectorAll('.skill-area')
            const spells = document.querySelectorAll('.spell-div')
            const slots = document.querySelectorAll('.spell-slot')
            let current = localStorage.getItem('characters')
            let fullArray = []
            if(current) fullArray = JSON.parse(current)
            let statArray = this.state.guy.stats
            let deetArray = this.state.guy.deets
            let weaponArray = []
            let skillArray = []
            let spellArray = []
            let slotArray = []
            for(let i = 0; i < weapons.length; i++) {
                    const title = weapons[i].childNodes[0].value === '' ? this.state.guy.weapons[i].name : weapons[i].childNodes[0].value
                    const bns = weapons[i].childNodes[1].value === '' ? this.state.guy.weapons[i].bonus : weapons[i].childNodes[1].value
                    const dmg = weapons[i].childNodes[2].value === '' ? this.state.guy.weapons[i].damage : weapons[i].childNodes[2].value
                    weaponArray.push({name: title, bonus: bns, damage: dmg })
            }
            for(let i = 0; i < skills.length; i++) {
                    const word = skills[i].childNodes[0].value === '' ? this.state.guy.skills[i].name : skills[i].childNodes[0].value
                    const describe = skills[i].childNodes[1].value === '' ? this.state.guy.skills[i].des : skills[i].childNodes[1].value
                    skillArray.push({name: word, des: describe})
            }
            for(let i = 0; i < spells.length; i++) {
                const title = spells[i].childNodes[0].value === '' ? this.state.guy.spells[i].name : spells[i].childNodes[0].value
                const damage = spells[i].childNodes[0].value === '' ? this.state.guy.spells[i].dmg : spells[i].childNodes[1].value
                const desc = spells[i].childNodes[0].value === '' ? this.state.guy.spells[i].des : spells[i].childNodes[2].value
                spellArray.push({name: title, dmg: damage, des: desc})
            }
            for(let i = 0; i < slots.length; i++) {
                const level = slots[i].childNodes[0].innerHTML
                const number = slots[i].childNodes[1].value === '' ? this.state.guy.spellSlots[i].num : slots[i].childNodes[1].value
                slotArray.push({lvl: level, num: number, used: 0})
            }

            let name = this.state.guy.name
            let race = this.state.guy.race
            let guyClass = this.state.guy.class
            firebase.database().ref(`characters/${this.props.match.params.id}`).set({
                name: inputs[0].value === '' ? name :  inputs[0].value,
                race: inputs[1].value === '' ? race :  inputs[1].value,
                class: inputs[2].value === '' ? guyClass :  inputs[2].value,
                level: inputs[3].value === '' ? this.state.guy.level : parseInt(inputs[3].value, 10),
                prof: inputs[4].value === '' ? this.state.guy.prof : parseInt(inputs[4].value, 10),
                exp: inputs[5].value === '' ? this.state.guy.exp : parseInt(inputs[5].value, 10),
                stats: statArray,
                deets: deetArray,
                ac: inputs[6].value === '' ? this.state.guy.ac : parseInt(inputs[6].value, 10),
                speed: inputs[7].value === '' ? this.state.guy.speed : parseInt(inputs[7].value, 10),
                initiative: inputs[8].value === '' ? this.state.guy.initiative : parseInt(inputs[8].value, 10),
                health: inputs[9].value === '' ? this.state.guy.health : parseInt(inputs[9].value, 10),
                pack: this.state.guy.pack,
                notes: this.state.guy.notes,
                skills: skillArray,
                tempHealth : this.state.guy.tempHealth,
                currentHealth: this.state.guy.currentHealth,
                spells: spellArray,
                spellSave: document.getElementById('spell-save').value === '' ? this.state.guy.spellSave : parseInt(document.getElementById('spell-save').value, 10),
                spellSlots: slotArray,
                weapons: weaponArray,
                password: this.state.guy.password
            })

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
        const prof = document.getElementById('prof').value === '' ? parseInt(this.state.guy.prof, 10) : parseInt(document.getElementById('prof').value, 10)
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
                displays[num].classList.remove('proficient')
                const tempGuy = this.state.guy
                tempGuy.deets[num].num = temp;
                tempGuy.deets[num].pro = false;
                this.setState({
                    guy: tempGuy
                })
            }
        }
        console.log(this.state.guy)
    }
    addSpell () {
        const daddy = document.getElementById('spells')
        const container = document.createElement('div')
        const input = document.createElement('input')
        const name = document.createElement('input')
        const area = document.createElement('textarea')
        name.placeholder = 'Name'
        input.placeholder ='Damage'
        area.placeholder = 'Description'
        area.classList.add('short-area')
        container.appendChild(name)
        container.appendChild(input)
        container.appendChild(area)
        container.classList.add('spell-div')
        daddy.appendChild(container)
    }

    removeSpell() {
        const over = document.getElementById('spells')
        if(over.childNodes.length) {
            const last = over.childNodes[over.childNodes.length - 1]
            over.removeChild(last)
        }
    }

    addSlot() {
        const daddy = document.getElementById('spell-slots')
        const container = document.createElement('div')
        const input = document.createElement('input')
        const header = document.createElement('h3')
        input.placeholder = '# of Slots'
        header.innerHTML = `Level ${daddy.childNodes.length}:`
        container.classList.add('spell-slot')
        container.appendChild(header)
        container.appendChild(input)
        daddy.appendChild(container)
    }

    removeSlot () {
        const over = document.getElementById('spell-slots')
        if(over.childNodes.length > 1) {
            const last = over.childNodes[over.childNodes.length - 1]
            over.removeChild(last)
        }
    }
    incValue(idx) {
        let tempGuy = this.state.guy
        let val = tempGuy.stats[idx].num
        val++
        tempGuy.stats[idx].num = val
        for(let i = 0; i < details.length; i++) {
            if(idx+1 === details[i].attr) {
                tempGuy.deets[i].num = Math.floor((val - 10) /2)
                if(tempGuy.deets[i].pro) {
                    tempGuy.deets[i].num += parseInt(tempGuy.prof, 10)
                }
            }
        }
        this.setState({
            guy: tempGuy
        })
    }
    decValue(idx) {
        let tempGuy = this.state.guy
        let val = tempGuy.stats[idx].num
        val--
        tempGuy.stats[idx].num = val
        for(let i = 0; i < details.length; i++) {
            if(idx+1 === details[i].attr) {
                tempGuy.deets[i].num = Math.floor((val - 10) /2)
                if(tempGuy.deets[i].pro) {
                    tempGuy.deets[i].num += parseInt(tempGuy.prof, 10)
                }
            }
        }
        this.setState({
            guy: tempGuy
        })
    }

        checkDeet (thing) {
            if(thing.pro) {
                return <span className='proficient deet-val'>{thing.num}</span>
            }
            
            else {
                return <span className='deet-val'>{thing.num}</span>
            }
        }
    toggleProStat(itr) {
        
        const list = document.querySelectorAll('.throw-box')
        const test = this.state.guy.stats[itr].pro
        if(test) list[itr].childNodes[0].classList.add('proficient')
        else list[itr].childNodes[0].classList.remove('proficient')
        let copy = this.state.guy
        copy.stats[itr].pro = !test

        this.setState({
            guy: copy
        })
    }

    componentWillMount() {
        var fireRef = firebase.database().ref(`characters/${this.props.match.params.id}`)
        fireRef.on('value', (snapshot) => {
            let temp = snapshot.val()
            if(!temp.spells) temp.spells = []
            if(!temp.spellSlots) temp.spellSlots = []
            console.log(temp)
            this.setState({
                guy: temp
            })
        })
    }
    
        render () {
        if(!this.state.guy) return <h1>Loading</h1>
        return (
            <div id='master-edit'>
            <div className ='col-12 full-pad new-char-card'>
                <div>
                    <h2>Basic Info</h2>
                    <input type='text' placeholder={this.state.guy.name}/>
                    <input type='text' placeholder={this.state.guy.race}/>
                    <input type='text' placeholder={this.state.guy.class} className='half-wit first'/>
                    <input type='number' placeholder={this.state.guy.level} className='half-wit '/>
                    <input type='number' placeholder={this.state.guy.prof} id='prof' className='half-wit first'/>
                    <input type='number' placeholder={this.state.guy.exp} className='half-wit'/>
                </div>
                <div id='edit-stats'>
                    <h2>Stats</h2>
                    {this.state.guy.stats.map((thing, itr) => (
                    <div className='throw-box' key={itr + 'c'}>
                        {proTitle(statNames[itr], this.state.guy.stats[itr].pro, this.toggleProStat, itr)}
                        <div className='inner-throw-box'>
                            <button onClick={()=> this.incValue(itr)}>+</button>
                            <span>{this.state.guy.stats[itr].num}</span>
                            <button onClick={()=> this.decValue(itr)}>-</button>
                        </div>
                    </div>
                    ))}
                    <input type='number' placeholder={`AC: ${this.state.guy.ac}`} className='third-wit' />
                    <input type='number' placeholder={`Speed: ${this.state.guy.speed}`} className='third-wit middle' />
                    <input type='number'placeholder={`Init: ${this.state.guy.initiative}`} className='third-wit' />
                    <input type='number' placeholder={`Speed: ${this.state.guy.health}`} />
                </div>
                <div>
                    <h2>Detail Stats</h2>
                    {details.map((thing, itr)=>{
                        if(!this.state.guy.deets[itr].pro) 
                        return (
                            <div className='lil-deet' key={thing.name} onClick={()=> this.addPro(itr)}><span>{thing.name}: </span>{this.checkDeet(this.state.guy.deets[itr])}</div>
                        )
                        else {
                            return (
                                <div className='lil-deet proficient' key={thing.name} onClick={()=> this.addPro(itr)}><span>{thing.name}: </span>{this.checkDeet(this.state.guy.deets[itr])}</div>
                            )
                        }
                    }
                )}
                </div>
                <div className='center-div'>
                    <h2>Weapons</h2>
                    <div id='weapons'>
                        {this.state.guy.weapons.map((data, itr) => (
                            <div key={data.name} className='weapon-div'>
                                <input type='text' placeholder={data.name} />
                                <input type='text' placeholder={data.bonus}/>
                                <input type='text' placeholder={data.damage}/>
                            </div>
                        ))}
                    </div>
                    <button onClick={() => this.addWeapon()}>Add Weapon</button>
                    <button onClick={() => this.removeWeapon()}>Remove Last</button>
                </div>
                <div className='center-div'>
                    <h2>Spells</h2>
                    <input type='text' id='spell-save' placeholder='Spell Save DC'/>
                    <div id='spells'>
                    {this.state.guy.spells.map((spell, itr) => (
                        <div key={spell.name} className='spell-div'>
                            <input type='text' placeholder={spell.name} />
                            <input type='text' placeholder={spell.dmg}/>
                            <textarea placeholder={spell.des} className='short-area'/> 
                        </div>
                        )
                    )}
                    </div>
                    <button onClick={()=>this.addSpell()}>Add Spell</button>
                    <button onClick={()=>this.removeSpell()}>Remove Last</button>
                </div>
                <div className='center-div'>
                    <h2>Spell Slots</h2>
                    <div id='spell-slots'>
                    {this.state.guy.spellSlots.map((thing, itr) => (
                        <div key={thing.lvl+'a'} className='spell-slot'>
                            <h3>{thing.lvl}</h3>
                            <input type='number' placeholder={thing.num} />
                        </div>
                    ))}

                    </div>

                    <button onClick={()=>this.addSlot()}>Add Spell Slot</button>
                    <button onClick={()=>this.removeSlot()}>Remove Last</button>
                </div>
                <div className='center-div'>
                    <div id='skills'>
                        <h2>Skills and Attributes</h2>
                        {this.state.guy.skills.map((data, itr) => (
                            <div key={data.name} className='skill-area'>
                                <input placeholder={data.name} />
                                <textarea placeholder={data.des} className='short-area'/>
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