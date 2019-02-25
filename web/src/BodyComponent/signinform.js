import React, { Component } from 'react';

import io from 'socket.io-client';

var socket = io.connect('http://localhost:8000');


class Signinform extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      roomId: ""
    };

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeRoomId = this.handleChangeRoomId.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChangeName = (event) =>{
      this.setState({name: event.target.value});
  }
  handleChangeRoomId = (event) =>{
    this.setState({roomId: event.target.value});
  }
  handleSubmit = async (event) =>{
    event.preventDefault();
    const res = await fetch('http://localhost:8000/users/'+this.state.roomId+'/create', {
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      },
    body: JSON.stringify({
      name: this.state.name,
    })
    })
    if(res.status===201)
    {
      this.props.onLogin();
    }
    
  }

render(){
  return(
      <form onSubmit={this.handleSubmit}>
        <label>
        Name:<input type="text" value={this.state.name} name= "name" onChange={this.handleChangeName}/>
        </label>
        <label>
        RoomId:<input type="text" value={this.state.roomId} name= "roomId"onChange={this.handleChangeRoomId}/>
        </label>
        <input type="submit" value="Sumbit"/>
      </form>
    )

}
}

export default Signinform;
