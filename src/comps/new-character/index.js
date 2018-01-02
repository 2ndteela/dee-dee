import React, { Component } from 'react'
import firebase from '../../fire'
import './style.css'
import { withRouter } from 'react-router-dom'

const details = [{attr: 3, name:'Acrobatics'}, {attr: 6, name:'Animal Handling'}, {attr: 4, name:'Arcana'}, {attr: 5, name:'Athletics'}, {attr: 1, name:'Deception'},
{ attr: 4, name:'History'}, {attr: 6, name:'Insight'}, {attr: 1, name: 'Intimidation'}, {attr: 4, name: 'Investigation'}, {attr: 6, name :'Medicine'},
{attr: 4, name: 'Nature'}, {attr: 6, name:'Perception'}, {attr: 1, name:'Performance'}, {attr: 1, name:'Persuasion'}, {attr: 4, name: 'Religion'}, {attr: 3, name:'Sleight of Hand'},
{attr: 3, name:'Stealth'}, {attr: 6, name:'Survival'}]

const showMessage = () => {
    const box =  document.getElementById('new-message')
    box.style.display = 'flex'
    box.style.opacity = '1'
    box.style.transition = '.3s'
    setTimeout(() => {
        box.style.opacity = '0'
    }, 2700);
    setTimeout(() => {
        box.style.display = 'none'
    }, 3000);
}

class NewCharacter extends Component {
    saveCharacter() {
        const inputs = document.querySelectorAll('input')
            const throws = document.querySelectorAll('.throw')
            const deets = document.querySelectorAll('.lil-deet')
            const areas = document.querySelectorAll('textarea')
            const weapons = document.querySelectorAll('.weapon-div')
            const skills = document.querySelectorAll('.skill-area')
            const spells = document.querySelectorAll('.spell-div')
            const slots = document.querySelectorAll('.spell-slot')
            const align = document.querySelector('select').value
            let statArray = []
            let deetArray = []
            let weaponArray = []
            let skillArray = []
            let spellArray = []
            let slotArray = []
            for(let i = 0; i < throws.length; i++) {
                statArray.push({num: parseInt(inputs[i+6].value, 10), pro: throws[i].classList.contains('proficient')})
            }
            for(let i = 0; i < deets.length; i++) {
                deetArray.push({num: parseInt(deets[i].childNodes[1].innerHTML, 10), pro: deets[i].classList.contains('proficient') })
            }
            for(let i = 0; i < weapons.length; i++) {
                const title = weapons[i].childNodes[0].value
                const bns = weapons[i].childNodes[1].value
                const dmg = weapons[i].childNodes[2].value
                weaponArray.push({name: title, bonus: bns, damage: dmg })
            }
            for(let i = 0; i < skills.length; i++) {
                const word = skills[i].childNodes[0].value
                const describe = skills[i].childNodes[1].value
                skillArray.push({name: word, des: describe})
            }
            for(let i = 0; i < spells.length; i++) {

                const title = spells[i].childNodes[0].value
                const damage = spells[i].childNodes[1].value
                const desc = spells[i].childNodes[2].value
                if(title && damage && desc && spells.length !== 1) { 
                    spellArray.push({name: title, dmg: damage, des: desc})
                }
            }
            for(let i = 0; i < slots.length; i++) {
                const level = slots[i].childNodes[0].innerHTML
                const number = slots[i].childNodes[1].value
                if(level && number) {
                slotArray.push({lvl: level, num: number, used: 0})
                }
            }
            const guy = {
                name: inputs[0].value,
                race: inputs[1].value,
                class: inputs[2].value,
                level: parseInt(inputs[3].value, 10),
                prof: parseInt(inputs[4].value, 10),
                exp: parseInt(inputs[5].value, 10),
                stats: statArray,
                deets: deetArray,
                alignment: align,
                ac: parseInt(inputs[12].value, 10),
                speed: parseInt(inputs[13].value, 10),
                initiative: parseInt(inputs[14].value, 10),
                health: parseInt(inputs[15].value, 10),
                pack: areas[areas.length-2].value,
                notes: areas[areas.length-1].value,
                weapons: weaponArray,
                skills: skillArray,
                tempHealth : 0,
                currentHealth: parseInt(inputs[15].value, 10),
                spells: spellArray,
                spellSave: parseInt(document.getElementById('spell-save').value, 10) === '' ? parseInt(document.getElementById('spell-save').value, 10) : 0,
                spellSlots: slotArray,
                password: inputs[inputs.length-1].value

            }
            if(guy.password === '') alert("enter a password")
            else if (guy.password.includes('/') || guy.password.includes('\\') )alert("Password shouldn't conatain a '/' or '\\'")
            else { 
                firebase.database().ref('characters').push( guy )
                showMessage()
                this.props.history.push('/')
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
        if(over.childNodes.length) { 
            const last = over.childNodes[over.childNodes.length - 1]
            over.removeChild(last)
        }
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
       if(over.childNodes.length) {
            const last = over.childNodes[over.childNodes.length - 1]
            over.removeChild(last)
       }
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

    addProThrow(num) {
        const displays = document.querySelectorAll('.throw-num')
        const prof = document.getElementById('prof').value
        if(prof) {
            let temp = parseInt(displays[num].innerHTML, 10)
            const test = displays[num].parentElement.classList.contains('proficient')
            if(!test) {
                temp += parseInt(prof, 10)
                displays[num].innerHTML = temp
                displays[num].parentElement.classList.add('proficient')
            }
            else {
                if(temp !== '' || !isNaN(temp)){
                    temp -= parseInt(prof, 10)
                } 
                displays[num].innerHTML = temp
                displays[num].parentElement.classList.remove('proficient')
            }
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
            }
            else {
                if(temp !== '' || !isNaN(temp)){
                    temp -= parseInt(prof, 10)
                } 
                displays[num].innerHTML = temp
                displays[num].parentElement.classList.remove('proficient')
            }
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
                if(throws[num-1].parentElement.classList.contains('proficient')) {
                    throws[num-1].innerHTML = withPro
                }
            }
        }
    render () {
        return (
        <div id='master-edit-page'>
            <h1 className='header'>New Character</h1>
            <div className ='col-12 full-pad new-char-card'>
                <div>
                    <h2>Basic Info</h2>
                    <input type='text' placeholder='Name'/>
                    <input type='text' placeholder='Race'/>
                    <input type='text' placeholder='Class' className='third-wit'/>
                    <input type='number' placeholder='Level' className='third-wit middle'/>
                    <input type='number' placeholder='Proficiency' id='prof' className='third-wit'/>
                    <input type='number' placeholder='Expierence' className='half-wit first'/>
                    <select className='half-wit'>
                        <option>Lawful Good</option>
                        <option>Neutral Good</option>
                        <option>Chaotic Good</option>
                        <option>Lawful Neutral</option>
                        <option>True Neutral</option>
                        <option>Chaotic Neutral</option>
                        <option>Lawful Evil</option>
                        <option>Neutral Evil</option>
                        <option>Chaotic Evil</option>
                    </select>
                </div>
                <div id='stats'>
                    <h2>Stats</h2>
                    <input type='number' placeholder='Charisma' className='half-wit first' onChange={() => this.getValue(1)}/>
                    <input type='number' placeholder='Constitution' className='half-wit' onChange={() => this.getValue(2)}/>
                    <input type='number' placeholder='Dexterity' className='half-wit first' onChange={() => this.getValue(3)}/>
                    <input type='number' placeholder='Intelligence' className='half-wit'onChange={() => this.getValue(4)}/>
                    <input type='number' placeholder='Strength' className='half-wit first' onChange={() => this.getValue(5)}/>
                    <input type='number' placeholder='Wisdom' className='half-wit' onChange={() => this.getValue(6)}/>
                    <input type='number' placeholder='AC' className='third-wit' />
                    <input type='number' placeholder='Speed' className='third-wit middle' />
                    <input type='number' placeholder='Initiavtive' className='third-wit' />
                    <input type='number' placeholder='Max Hit Points' />
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
                            <div className='lil-deet' key={thing.name} onClick={()=> this.addPro(itr)}><span>{thing.name}: </span><span className='deet-val'>0</span></div>
                        )
                    }
                )}
                </div>
                <div className='center-div'>
                    <h2>Weapons</h2>
                    <div id='weapons'>
                        <div className='weapon-div'>
                            <input type='text' placeholder='Weapon' />
                            <input type='text' placeholder='Atk Bns'/>
                            <input type='text' placeholder='Damage'/>
                        </div>
                    </div>
                    <button onClick={() => this.addWeapon()}>Add Weapon</button>
                    <button onClick={() => this.removeWeapon()}>Remove Last</button>
                </div>
                <div className='center-div'>
                    <h2>Spells</h2>
                    <input type='text' id='spell-save' placeholder='Spell Save DC'/>
                    <div id='spells'>
                        <div className='spell-div'>
                            <input type='text' placeholder='Name' />
                            <input type='text' placeholder='Damage'/>
                            <textarea placeholder='Description' className='short-area'/> 
                        </div>
                    </div>
                    <button onClick={()=>this.addSpell()}>Add Spell</button>
                    <button onClick={()=>this.removeSpell()}>Remove Last</button>
                </div>
                <div className='center-div'>
                    <h2>Spell Slots</h2>
                    <div id='spell-slots'>
                        <div className='spell-slot'>
                            <h3>Cantrips:</h3>
                            <input type='number' placeholder='# of slots' />
                        </div>
                    </div>

                    <button onClick={()=>this.addSlot()}>Add Spell Slot</button>
                    <button onClick={()=>this.removeSlot()}>Remove Last</button>
                </div>
                <div className='center-div'>
                    <div id='skills'>
                        <h2>Skills and Attributes</h2>
                        <div className='skill-area'>
                            <input placeholder='Title' />
                            <textarea placeholder='Description' className='short-area'/>
                        </div>
                    </div>
                    <button onClick={() => this.addSkill()}>Add New</button>
                    <button onClick={() => this.removeSkill()}>Remove Last</button>
                </div>
                <div>
                    <h2>Pack</h2>
                    <textarea></textarea>
                </div>
                <div>
                    <h2>Notes</h2>
                    <textarea></textarea>
                </div>
                <input placeholder='Password'/>
                <button onClick={()=>this.saveCharacter()}>Save Character</button>
            </div>
        </div>
        )
    }
}

export default withRouter(NewCharacter)