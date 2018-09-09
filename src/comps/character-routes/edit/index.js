import React, { Component } from 'react'
import './style.css'
import firebase from 'firebase'

const details = [{attr: 3, name:'Acrobatics'}, {attr: 6, name:'Animal Handling'}, {attr: 4, name:'Arcana'}, {attr: 5, name:'Athletics'}, {attr: 1, name:'Deception'},
{ attr: 4, name:'History'}, {attr: 6, name:'Insight'}, {attr: 1, name: 'Intimidation'}, {attr: 4, name: 'Investigation'}, {attr: 6, name :'Medicine'},
{attr: 4, name: 'Nature'}, {attr: 6, name:'Perception'}, {attr: 1, name:'Performance'}, {attr: 1, name:'Persuasion'}, {attr: 4, name: 'Religion'}, {attr: 3, name:'Sleight of Hand'},
{attr: 3, name:'Stealth'}, {attr: 6, name:'Survival'}]

const statNames = ['Charisma', 'Constitution', 'Dexterity', 'Intelligence', 'Strength', 'Wisdom']

const toggleCheck = (e) => {
    const target = e.target
    let inner = target.childNodes[0]
    if(!inner) inner = target 
    if(inner.classList.contains('checked')) inner.classList.remove('checked')
    else inner.classList.add('checked')
}

const CheckBox = (test) => {
    if(test) {
        return (
    <div className='check-box-container'>
    <div className='outer-check-box' onClick={(e) => toggleCheck(e)}>
        <div className='inner-check-box checked'></div>
    </div>
    <span>Prepare Spell</span>
    </div>
        )
    }
    else {
        return (
            <div className='check-box-container'>
            <div className='outer-check-box' onClick={(e) => toggleCheck(e)}>
                <div className='inner-check-box'></div>
            </div>
            <span>Prepare Spell</span>
            </div>
        )
    }
}

const proTitle = (word, isBlue, callback, idx) => {
    if(isBlue) return <div onClick={()=>callback(idx)} className='proficient'>{word}</div>
    return <div onClick={()=>callback(idx)}>{word}</div>
}

const showMessage = () => {
    const box =  document.getElementById('saved-message')
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

class EditPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            guy: null
        }
        this.toggleProStat = this.toggleProStat.bind(this)
    }
    saveCharacter() {
            const spells = document.querySelectorAll('.spell-div')
            const preparedSpells = document.querySelectorAll('.inner-check-box')
            let spellArray = []
            for(let i = 0; i < spells.length; i++) {
                const title = this.state.guy.spells[i].name
                const damage = this.state.guy.spells[i].dmg
                const desc = this.state.guy.spells[i].des
                const level = this.state.guy.spells[i].lvl
                const temp = {name: title, dmg: damage, des: desc, lvl: level}
                if(preparedSpells[i].classList.contains('checked')) temp.prep = true
                spellArray.push(temp)
            }
            firebase.database().ref(`characters/${this.props.id}`).set({
                name: this.state.guy.name,
                race: this.state.guy.race,
                class: this.state.guy.class,
                level: this.state.guy.level,
                prof: this.state.guy.prof,
                exp: this.state.guy.exp,
                stats: this.state.guy.stats,
                deets: this.state.guy.deets,
                ac: this.state.guy.ac, 
                speed: this.state.guy.speed,
                initiative: this.state.guy.initiative,
                health: this.state.guy.health,
                pack: this.state.guy.pack,
                notes: this.state.guy.notes,
                skills: this.state.guy.skills,
                tempHealth : this.state.guy.tempHealth,
                currentHealth: this.state.guy.currentHealth,
                spells: spellArray,
                spellSave: this.state.guy.spellSave,
                spellSlots: this.state.guy.spellSlots,
                weapons: this.state.guy.weapons,
                password: this.state.guy.password,
                alignment: this.state.guy.alignment
            }).then((res, req, err) => {
                if(err) return
                else showMessage()
            })

    }
    addSkill() {
        let temp = this.state.guy
        temp.skills.push({})
        this.setState({
            guy: temp
        })
    }

    removeSkill() {
        let temp = this.state.guy
        temp.skills.pop()
        this.setState({
            guy: temp
        })
    }

    addWeapon() {
        let temp = this.state.guy
        temp.weapons.push({})
        this.setState({
            guy: temp
        })
    }
    removeWeapon() {
        let temp = this.state.guy
        temp.weapons.pop()
        this.setState({
            guy: temp
        })
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
    }
    addSpell () {
        let temp = this.state.guy
        temp.spells.push({})
        this.setState({
            guy: temp
        })
    }

    removeSpell() {
        let temp = this.state.guy
        temp.spells.pop()
        this.setState({
            guy: temp
        })
    }

    addSlot() {
        let temp = this.state.guy
        temp.spellSlots.push({lvl: 'Level ' + temp.spellSlots.length + ':'})
        this.setState({
            guy: temp
        })
    }

    removeSlot () {
        let temp = this.state.guy
        temp.spellSlots.pop()
        this.setState({
            guy: temp
        })
    }

    spellSoltUpdate(e, itr) {
        let temp = this.state.guy
        temp.spellSlots[itr].num = e.target.value

        this.setState({
            guy: temp
        })
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

    changeSpellName(e, num) {
        let tempGuy = this.state.guy
        let tempSpell = e.target.value
        tempGuy.spells[num].name = tempSpell
        this.setState({
            guy: tempGuy
        })
    }

    changeSpellDes(e, num) {
        let tempGuy = this.state.guy
        let tempSpell = e.target.value
        tempGuy.spells[num].des = tempSpell
        this.setState({
            guy: tempGuy
        })
    }

    changeSpellDamage(e, num) {
        let tempGuy = this.state.guy
        let tempSpell = e.target.value
        tempGuy.spells[num].dmg = tempSpell
        this.setState({
            guy: tempGuy
        })
    }

    changeSpellLvl(e, num) {
        let tempGuy = this.state.guy
        let tempSpell = e.target.value
        tempGuy.spells[num].lvl = tempSpell
        this.setState({
            guy: tempGuy
        })
    }

    changeTraitDes(e, num) {
        let tempGuy = this.state.guy
        let tempTrait = e.target.value
        tempGuy.skills[num].des = tempTrait
        this.setState({
            guy: tempGuy
        })
    }

    changeTraitName(e, num) {
        let tempGuy = this.state.guy
        let tempTrait = e.target.value
        tempGuy.skills[num].name = tempTrait
        this.setState({
            guy: tempGuy
        })
    }

    changeWeaponName(e, itr) {
        let tempGuy = this.state.guy
        let wep = e.target.value
        tempGuy.weapons[itr].name = wep
        this.setState({
            guy: tempGuy
        })
    } 

    changeWeaponBonus(e, itr) {
        let tempGuy = this.state.guy
        let wep = e.target.value
        tempGuy.weapons[itr].bonus = wep
        this.setState({
            guy: tempGuy
        })
    }
    
    changeWeaponDamage(e, itr) {
        let tempGuy = this.state.guy
        let wep = e.target.value
        tempGuy.weapons[itr].damage = wep
        this.setState({
            guy: tempGuy
        })
    } 

    generalChange(e, val) {
        let tempGuy = this.state.guy
        let temp = e.target.value

        tempGuy[val] = temp

        this.setState({
            guy: tempGuy
        })

    }

    componentWillMount() {
        var fireRef = firebase.database().ref(`characters/${this.props.id}`)
        fireRef.on('value', (snapshot) => {
            let temp = snapshot.val()
            if(!temp.spells) temp.spells = []
            if(!temp.spellSlots) temp.spellSlots = []
            this.setState({
                guy: temp
            })
        })
    }
    
        render () {
        if(!this.state.guy) return <h1>Loading</h1>
        return (
            <div id='master-edit'>
            <div id='saved-message'>
                Character Updated
            </div>
            <div className ='col-12 full-pad new-char-card'>
                <div>
                    <h2>Basic Info</h2>
                    <div>
                        <input type='text' className='twopx-margin' value={this.state.guy.name} onChange={(e) => this.generalChange(e, 'name')}/>
                        <label>Name</label>
                    </div>
                    <div>
                        <input type='text' className='twopx-margin' value={this.state.guy.race} onChange={(e) => this.generalChange(e, 'race')}/>
                        <label>Race</label>
                    </div>
                    <div className='third-wit'>
                        <input type='text' className='twopx-margin' value={this.state.guy.class} onChange={(e) => this.generalChange(e, 'class')}/>
                        <label>Class</label>
                    </div>
                    <div className='third-wit middle'>
                        <input type='number' value={this.state.guy.level} className='twopx-margin' onChange={(e) => this.generalChange(e, 'level')} />
                        <label>Level</label>
                    </div>
                    <div className='third-wit'>
                        <input type='number' value={this.state.guy.prof} id='prof' className='twopx-margin' onChange={(e) => this.generalChange(e, 'prof')}/>
                        <label>Proficiency</label>
                    </div>
                    <div className='half-wit first'>
                        <input type='number' value={this.state.guy.exp} className='twopx-margin' onChange={(e) => this.generalChange(e, 'exp')}/>
                        <label>Expirience</label>
                    </div>
                    <div className='half-wit'>
                        <div className='twopx-margin'>
                        <select value={this.state.guy.alignment} onChange={(e) => this.generalChange(e, 'alignment')} >
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
                        <label>Alignment</label>
                    </div>
                </div>
                <div id='edit-stats'>
                    <h2>Stats</h2>
                    <div>
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
                    </div>
                    <div className='third-wit'>
                        <input type='number' value={this.state.guy.ac} onChange={(e) => this.generalChange(e, 'ac')} className='twopx-margin' />
                        <label>Armor Class</label>
                    </div>
                    <div className='third-wit middle'>
                        <input type='number' value={this.state.guy.speed} onChange={(e) => this.generalChange(e, 'speed')} className='twopx-margin' />
                        <label>Speed</label>
                    </div>
                    <div className='third-wit' >
                        <input type='number'  className='twopx-margin' value={this.state.guy.initiative} onChange={(e) => this.generalChange(e, 'initiative')} />
                        <label>Initiative</label>
                    </div>
                    <div>
                        <input type='number' className='twopx-margin' value={this.state.guy.health} />
                        <label>Max Health</label>
                    </div>
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
                            <div key={itr + 'weap'} className='weapon-div'>
                                <input type='text' value={data.name} onChange={(e)=> this.changeWeaponName(e, itr)} />
                                <input type='text' value={data.bonus} onChange={(e)=> this.changeWeaponBonus(e, itr)}/>
                                <input type='text' value={data.damage} onChange={(e)=> this.changeWeaponDamage(e, itr)}/>
                            </div>
                        ))}
                    </div>
                    <button onClick={() => this.addWeapon()}>Add Weapon</button>
                    <button onClick={() => this.removeWeapon()}>Remove Last</button>
                </div>
                <div className='center-div'>
                    <h2>Spells</h2>
                    <div>
                        <input type='text' className='twopx-margin' id='spell-save' value={this.state.guy.spellSave} onChange={(e) => this.generalChange(e, 'spellSave')}/>
                        <label>Spell Save</label>
                    </div>
                    <div id='spells'>
                    {this.state.guy.spells.map((spell, itr) => (
                        <div key={'spellname ' + itr} className='spell-div'>
                            <div>
                                <input type='text' value={spell.name} onChange={(e) => this.changeSpellName(e,itr)} className='twopx-margin' />
                                <label>Name</label>
                            </div>
                            <div className='half-wit first'>
                                <input type='text' value={spell.dmg} onChange={(e) => this.changeSpellDamage(e, itr)} className='twopx-margin' />
                                <label>Damage</label>
                            </div>
                            <div className="half-wit">
                                <select value={spell.lvl} className="twopx-margin" onChange={(e) => this.changeSpellLvl(e, itr)} >
                                    { this.state.guy.spellSlots.map((thing, itr) => {
                                        if(itr === 0) return <option key='Cant' value='Cantrip'>Cantrip</option>
                                        else return <option value={itr} key={itr + 'cn'} >{itr}</option>
                                    }) }
                                </select>
                                <label>Level</label>
                            </div>
                            <textarea value={spell.des} className='short-area' onChange={(e) => this.changeSpellDes(e, itr)}/> 
                            {CheckBox(spell.prep)}
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
                            <input type='number' value={thing.num} onChange={(e) => this.spellSoltUpdate(e, itr)} />
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
                            <div key={'skill' + itr} className='skill-area'>
                                <input placeholder='Name' value={data.name} onChange={(e) => this.changeTraitName(e, itr)}  />
                                <textarea placeholder='Description' value={data.des} onChange={(e) => this.changeTraitDes(e, itr)} className='short-area'/>
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