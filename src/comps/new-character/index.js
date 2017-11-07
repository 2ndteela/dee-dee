import React, { Component } from 'react'
import './style.css'

const details = [{attr: 3, name:'Acrobatics'}, {attr: 6, name:'Animal Handling'}, {attr: 4, name:'Arcana'}, {attr: 5, name:'Athletics'}, {attr: 1, name:'Deception'},
{ attr: 4, name:'History'}, {attr: 6, name:'Insight'}, {attr: 1, name: 'Intimidation'}, {attr: 4, name: 'Investigation'}, {attr: 6, name :'Medicine'},
{attr: 4, name: 'Nature'}, {attr: 6, name:'Perception'}, {attr: 1, name:'Performance'}, {attr: 1, name:'Persuasion'}, {attr: 4, name: 'Religion'}, {attr: 3, name:'Sleight of Hand'},
{attr: 3, name:'Stealth'}, {attr: 6, name:'Survival'}]

class NewCharacter extends Component {
    saveCharacter() {
        if (typeof(Storage) !== "undefined") {
            const inputs = document.querySelectorAll('input')
            const throws = document.querySelectorAll('.throw')
            const deets = document.querySelectorAll('.lil-deet')
            const areas = document.querySelectorAll('textarea')
            const weapons = document.querySelectorAll('.weapon-div')
            const skills = document.querySelectorAll('.skill-area')
            const password = inputs[inputs.length -1].value
            let current = localStorage.getItem(password)
            let fullArray = []
            if(current) fullArray = JSON.parse(current)
            let statArray = []
            let deetArray = []
            let weaponArray = []
            let skillArray = []
            for(let i = 0; i < throws.length; i++) {
                statArray.push({num: parseInt(inputs[i+6].value), pro: throws[i].classList.contains('proficient')})
            }
            for(let i = 0; i < deets.length; i++) {
                deetArray.push({num: parseInt(deets[i].childNodes[1].innerHTML), pro: deets[i].classList.contains('proficient') })
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
            const guy = {
                name: inputs[0].value,
                race: inputs[1].value,
                class: inputs[2].value,
                level: parseInt(inputs[3].value),
                prof: parseInt(inputs[4].value),
                exp: parseInt(inputs[5].value),
                stats: statArray,
                deets: deetArray,
                ac: parseInt(inputs[12].value),
                speed: parseInt(inputs[13].value),
                initiavtive: (inputs[14].value),
                health: parseInt(inputs[15].value),
                pack: areas[0].value,
                notes: areas[1].value,
                weapons: weaponArray,
                skills: skillArray

            }
            console.log(guy)
            fullArray.push(guy)
            if(password !== '') localStorage.setItem(password, JSON.stringify(fullArray))
            else {
                window.alert("You need to put in a passord")
            }
        } else {
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
            let temp = parseInt(displays[num].innerHTML)
            const test = displays[num].parentElement.classList.contains('proficient')
            if(!test) {
                temp += parseInt(prof)
                displays[num].innerHTML = temp
                displays[num].parentElement.classList.add('proficient')
            }
            else {
                if(temp !== '' || !isNaN(temp)){
                    temp -= parseInt(prof)
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
            let temp = parseInt(displays[num].innerHTML)
            const test = displays[num].parentElement.classList.contains('proficient')
            if(!test) {
                temp += parseInt(prof)
                displays[num].innerHTML = temp
                displays[num].parentElement.classList.add('proficient')
            }
            else {
                if(temp !== '' || !isNaN(temp)){
                    temp -= parseInt(prof)
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
                let temp = Math.ceil((parseInt(numbas[num-1].value) - 10) /2)
                const withPro = parseInt(temp) + parseInt(prof)
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
        <div>
            <h1 className='header'>New Character</h1>
            <div className ='col-12 full-pad new-char-card'>
                <div>
                    <h2>Basic Info</h2>
                    <input type='text' placeholder='Name'/>
                    <input type='text' placeholder='Race'/>
                    <input type='text' placeholder='Class' className='half-wit first'/>
                    <input type='number' placeholder='Level' className='half-wit '/>
                    <input type='number' placeholder='Proficiency' id='prof' className='half-wit first'/>
                    <input type='number' placeholder='Expierence' className='half-wit'/>
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

export default NewCharacter