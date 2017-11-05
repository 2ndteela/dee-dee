import React, { Component } from 'react'
import './style.css'

const details = [{attr: 3, name:'Acrobatics'}, {attr: 6, name:'Animal Handling'}, {attr: 4, name:'Arcana'}, {attr: 5, name:'Athletics'}, {attr: 1, name:'Deception'},
{ attr: 4, name:'History'}, {attr: 6, name:'Insight'}, {attr: 1, name: 'Intimidation'}, {attr: 4, name: 'Investigation'}, {attr: 6, name :'Medicine'},
{attr: 4, name: 'Nature'}, {attr: 6, name:'Perception'}, {attr: 1, name:'Performance'}, {attr: 1, name:'Persuasion'}, {attr: 4, name: 'Religion'}, {attr: 3, name:'Sleight of Hand'},
{attr: 3, name:'Stealth'}, {attr: 6, name:'Survival'}]

class NewCharacter extends Component {

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
        const prof = document.getElementById('prof').value
        const throws = document.querySelectorAll('.throw-num')

            for(let i = 0; i < displays.length; i++) {
                if(details[i].attr === num) {
                    if(numbas[num-1].value === '') {
                        displays[i].innerHTML = 0
                        throws[num-1].innerHTML = 0
                    }
                    else {
                        let temp = Math.ceil((parseInt(numbas[num-1].value) - 10) /2)
                        if(displays[i].parentElement.classList.contains('proficient')) {
                           temp += parseInt(prof)
                        }
                        displays[i].innerHTML = temp
                        if(throws[num-1].parentElement.classList.contains('proficient')) {
                            throws[num-1].innerHTML += parseInt(prof)
                        }
                    }
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
                </div>
                <div>
                    <h2>Saving Throws</h2>
                    <div >
                        <div className='throw half-wit first proficient'><span>Charisma</span><span className='throw-num'>0</span></div>
                        <div className='throw half-wit' ><span>Constitution</span><span className='throw-num'>0</span></div>
                        <div className='throw half-wit first'><span>Dexterity</span><span className='throw-num'>0</span></div>
                        <div className='throw half-wit'><span>Intelligence</span><span className='throw-num'>0</span></div>
                        <div className='throw half-wit first'><span>Strength</span><span className='throw-num'>0</span></div>
                        <div className='throw half-wit'><span>Wisdom</span><span className='throw-num'>0</span></div>
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
            </div>
        </div>
        )
    }
}

export default NewCharacter