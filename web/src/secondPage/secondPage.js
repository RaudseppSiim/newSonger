import React, { Component } from 'react';

import Signinform from '../BodyComponent/signinform';
import ChatForm from '../BodyComponent/chatForm';
import YouTube from '../BodyComponent/youtube';

import io from 'socket.io-client';

var socket = io.connect('http://localhost:8000');


class Secondpage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      login:false,
      room:null
    };
  }
  socket=null;

  componentDidMount() {
    console.log("mount")
    socket.on('connection', async (socket) => {
      

      this.socket = socket
      console.log('Socket connected')
      
    })
  }
loginSuccess = async () => {
  const res = await fetch('http://localhost:8000/rooms')
      const { payload } = await res.json()
        console.log(payload);
      this.setState({ room: payload[0],  login:true })

}

clickHandle = () =>{
  alert('click');
}

render(){
  return(
    <div>
      
      {this.state.login==false && <div className="OverlayLogin">
        <Signinform onLogin={this.loginSuccess}></Signinform>
      </div>}
      <div className="main-container">
        <ChatForm socket={socket}></ChatForm>
        <YouTube room = {this.state.room} socket={socket}></YouTube>
      </div>
    </div>
    )
  }
}

export default Secondpage;
