import React, { Component } from 'react';

import io from 'socket.io-client';

var socket = io.connect('http://localhost:8000');


class Signinform extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      roomId: "",
      youtubeSong:""
    };

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeRoomId = this.handleChangeRoomId.bind(this);
    this.handleChangeYoutubeSong = this.handleChangeYoutubeSong.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChangeName = (event) =>{
      this.setState({name: event.target.value});
  }
  handleChangeRoomId = (event) =>{
    this.setState({roomId: event.target.value});
  }
  handleChangeYoutubeSong = (event) =>{
    this.setState({youtubeSong: event.target.value});
  }
  handleSubmit = async (event) =>{
    event.preventDefault();
    var youtubeId
     if(this.state.youtubeSong.includes("youtube") || this.state.youtubeSong.includes("youtu.be"))
     {
      youtubeId = this.state.youtubeSong.substring(this.state.youtubeSong.length-11)
     } else {
      youtubeId = this.state.youtubeSong
     }
      this.props.onLogin(this.state.name,youtubeId,this.state.roomId);
    
  }

render(){
  return(
      <form onSubmit={this.handleSubmit}>
        <label>
        Name:<input type="text" value={this.state.name} name= "name" onChange={this.handleChangeName}/>
        </label>
        {this.props.mode==="Join" &&
        <label>
        RoomId:<input type="text" value={this.state.roomId} name= "roomId"onChange={this.handleChangeRoomId}/>
        </label>}
        <label>
        Youtube song:<input type="text" value={this.state.youtubeSong} name= "roomId" onChange={this.handleChangeYoutubeSong}/>
        </label>
        <input type="submit" value="Sumbit"/>
      </form>
    )

}
}

export default Signinform;
