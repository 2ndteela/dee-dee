import React, { Component } from 'react'
import './style.css'
import firebase from '../../../fire'

class Pack extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            pack: null,
            notes: null,
            guy: null
        }
    }
    type(event, which) {
        if(which) {
            this.setState({
                pack: event.target.value
            })
        }
        else {
            this.setState({
                notes: event.target.value
            })
        }
    }

    componentWillMount () {
        var fireRef = firebase.database().ref(`characters/${this.props.id}`)
        fireRef.on('value', (snapshot) => {
            this.setState({
                guy: snapshot.val(),
                notes: snapshot.val().notes,
                pack: snapshot.val().pack
            })
            if(!snapshot.val().skills) {
                let temp = snapshot.val()
                temp.skills = []
                this.setState({
                    guy: temp
                })
            }
        })
    }

    componentWillUnmount() {
       firebase.database().ref(`characters/${this.props.id}`).update({pack: this.state.pack, notes: this.state.notes})

    }
    render () {
        if(this.state.guy) {
        return(
            <div id="pack-div">
                <h1>Pack</h1>
                <textarea defaultValue={this.state.pack} onChange={(event) => this.type(event, true)}></textarea>
                <h1>Notes</h1>
                <textarea defaultValue={this.state.notes} onChange={(event) => this.type(event, false)}></textarea>
                <h1>Skills</h1>
                <div className='skill-div'>
                    {this.state.guy.skills.map((data, itr) => (
                    <div key={itr}>
                        <h2>{data.name}</h2>
                        <p>{data.des}</p>
                    </div>
                    )
                )}
                </div>
            </div>
        )
    }
    else return <h1>Loading</h1>
}
}

export default Pack