import React, { Component } from 'react';

import Signinform from '../BodyComponent/signinform';
import ChatForm from '../BodyComponent/chatForm';
import YouTube from '../BodyComponent/youtube';
import Header from '../BodyComponent/header';

import io from 'socket.io-client';
import PlayerList from '../BodyComponent/playerlist';

var socket = io.connect('http://localhost:8000');


class Secondpage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      login:false,
      room:null,
      user:"",
      players:[]
    };
  }
  socket=null;
  

  componentDidMount() {
    console.log("mount")
    console.log(socket)
    socket.on('connection', async (socket) => {
      
      this.socket = socket
      console.log('Socket connected')
      
    })
    
  }
loginSuccess = async (name,youtube,roomId) => {
  console.log(this.props.mode)
  // const res = await fetch('http://localhost:8000/rooms')
  //     const { payload } = await res.json()
  //       console.log(payload);
  //     this.setState({ room: payload[0],  login:true, user:name })
      if(this.props.mode=="Join"){
        const res = await fetch('http://localhost:8000/videos/'+roomId+'/videos',{
          method: 'POST',
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          },
        body: JSON.stringify({
          videoId:youtube
        })
        })
        
        console.log(res)
        if(res.status==201){
          const res = await fetch('http://localhost:8000/rooms/'+roomId)
          const { payload } = await res.json()
          console.log(payload)
          this.setState({ room: payload, user:name })
        }
        
      }
      if(this.props.mode=="Create"){
        const res = await fetch('http://localhost:8000/rooms/', {
          method: 'POST',
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          },
        body: JSON.stringify({
          name: name,
          queue:[youtube]
        })
      })
      const { payload } = await res.json()
      console.log(payload)
      
      this.setState({ room: payload, user:name })
      }
      const res = await fetch('http://localhost:8000/users/'+this.state.room.id+'/create', {
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      },
    body: JSON.stringify({
      name: name,
    })
    })
    const { payload } = await res.json()
    console.log(res.status);
    if(res.status==201){
      this.setState({ login:true })
    }
    

}

clickHandle = () =>{
  alert('click');
}

render(){
  return(
    <div>
      
      {this.state.login==false && <div className="OverlayLogin">
        <Signinform mode = {this.props.mode} onLogin={this.loginSuccess}></Signinform>
      </div>}
      {this.state.login==true &&
      <div>
        <Header user={this.state.user} room = {this.state.room}></Header>
      <div className="main-container">
        <ChatForm user = {this.state.user} room = {this.state.room} socket={socket}></ChatForm>
        <YouTube room = {this.state.room} user = {this.state.user} socket={socket}></YouTube>
        </div>
        <PlayerList socket={socket} room = {this.state.room}></PlayerList>
      </div>}
    </div>
    )
  }
}

export default Secondpage;
