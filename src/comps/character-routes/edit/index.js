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
            const inputs = document.querySelectorAll('input')
            const throws = document.querySelectorAll('.throw')
            const deets = document.querySelectorAll('.lil-deet')
            const weapons = document.querySelectorAll('.weapon-div')
            const skills = document.querySelectorAll('.skill-area')
            const spells = document.querySelectorAll('.spell-div')
            const slots = document.querySelectorAll('.spell-slot')
            const password = inputs[inputs.length -1].value
            let current = localStorage.getItem(password)
            let fullArray = []
            if(current) fullArray = JSON.parse(current, 10)
            let statArray = []
            let deetArray = []
            let weaponArray = []
            let skillArray = []
            let spellArray = []
            let slotArray = []
            for(let i = 0; i < throws.length; i++) {
                if(inputs[i+6].value !== '') {
                    statArray.push({num: parseInt(inputs[i+6].value, 10), pro: throws[i].classList.contains('proficient')})
                }
                else {
                    statArray.push(this.state.guy.stats[i])
                }
            }
            for(let i = 0; i < deets.length; i++) {
                deetArray.push({num: parseInt(deets[i].childNodes[1].innerHTML, 10), pro: deets[i].classList.contains('proficient') })
            }
            for(let i = 0; i < weapons.length; i++) {
                    const title = weapons[i].childNodes[0].value === '' ? this.state.guy.weapons[i].name : weapons[i].childNodes[0].value
                    const bns = weapons[i].childNodes[1].value === '' ? this.state.guy.weapons[i].bns : weapons[i].childNodes[1].value
                    const dmg = weapons[i].childNodes[0].value === '' ? this.state.guy.weapons[i].dmg : weapons[i].childNodes[2].value
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
            const newGuy = {
                name: inputs[0].value === '' ? name :  inputs[0].value,
                race: inputs[1].value === '' ? race :  inputs[1].value,
                class: inputs[2].value === '' ? guyClass :  inputs[2].value,
                level: inputs[3].value === '' ? this.state.guy.level : parseInt(inputs[3].value, 10),
                prof: inputs[4].value === '' ? this.state.guy.prof : parseInt(inputs[4].value, 10),
                exp: inputs[5].value === '' ? this.state.guy.exp : parseInt(inputs[5].value, 10),
                stats: statArray,
                deets: deetArray,
                ac: inputs[12].value === '' ? this.state.guy.ac : parseInt(inputs[12].value, 10),
                speed: inputs[13].value === '' ? this.state.guy.speed : parseInt(inputs[13].value, 10),
                initiavtive: inputs[14].value === '' ? this.state.guy.initiavtive : (inputs[14].value, 10),
                health: inputs[15].value === '' ? this.state.guy.health : parseInt(inputs[15].value, 10),
                pack: this.state.guy.pack,
                notes: this.state.guy.notes,
                skills: skillArray,
                tempHealth : this.state.guy.tempHealth,
                currentHealth: this.state.guy.currentHealth,
                spells: spellArray,
                spellSave: document.getElementById('spell-save').value === '' ? this.state.guy.spellSave : parseInt(document.getElementById('spell-save').value, 10),
                spellSlots: slotArray

            }
            console.log(newGuy)
            fullArray[this.props.index] = newGuy
            //localStorage.setItem('characters', JSON.stringify(fullArray))
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
            console.log(this.state.guy)
        return (
            <div>
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
                <div id='stats'>
                    <h2>Stats</h2>
                    <input type='number' placeholder={this.state.guy.stats[0].num} className='half-wit first' onChange={() => this.getValue(1)}/>
                    <input type='number' placeholder={this.state.guy.stats[1].num} className='half-wit' onChange={() => this.getValue(2)}/>
                    <input type='number' placeholder={this.state.guy.stats[2].num} className='half-wit first' onChange={() => this.getValue(3)}/>
                    <input type='number' placeholder={this.state.guy.stats[3].num} className='half-wit'onChange={() => this.getValue(4)}/>
                    <input type='number' placeholder={this.state.guy.stats[4].num} className='half-wit first' onChange={() => this.getValue(5)}/>
                    <input type='number' placeholder={this.state.guy.stats[5].num} className='half-wit' onChange={() => this.getValue(6)}/>
                    <input type='number' placeholder={this.state.guy.ac} className='third-wit' />
                    <input type='number' placeholder={this.state.guy.speed} className='third-wit middle' />
                    <input type='number'placeholder={this.state.guy.initiavtive} className='third-wit' />
                    <input type='number' placeholder={this.state.guy.health} />
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
                        <div className='spell-div'>
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
                        <div className='spell-slot'>
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