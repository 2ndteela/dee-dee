import React, { Component } from 'react'
import './style.css'
import store from '../../../store'
import firebase from '../../../fire'

class Pack extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            pack: store.getState().pack,
            notes: store.getState().notes,
            guy: store.getState()
        }
    }
    type(event, which) {
        let toSend = {}
        if(which) {
            this.setState({
                pack: event.target.value
            })
            toSend = {
                type: 'PACK',
                payload: this.state.pack
            }
        }
        else {
            this.setState({
                notes: event.target.value
            })
            toSend = {
                type: 'NOTES',
                payload: this.state.notes
            }
        }
        store.dispatch(toSend)
    }
    componentWillUnmount() {
       var db = firebase.database()
       db.ref("characters").equalTo(this.state.guy._id).on("child_added", function(snapshot) {
           console.log(snapshot.val())
           snapshot.ref.update({pack: this.state.pack})
       })
       db.ref(this.state.guy._id).update({notes: this.state.notes})

    }
    render () {
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
}

export default Pack