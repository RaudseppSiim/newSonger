import React, { Component } from 'react';

import io from 'socket.io-client';
import Signinform from '../BodyComponent/signinform';
import ChatForm from '../BodyComponent/chatForm';
import YouTube from '../BodyComponent/youtube';


class Secondpage extends Component {

clickHandle = () =>{
  alert('click');
}

render(){
  return(
    <div>
      <div className="OverlayLogin">
        <Signinform></Signinform>
      </div>
      <div className="main-container">
        <ChatForm></ChatForm>
        <YouTube></YouTube>
      </div>
    </div>
    )
  }
}

export default Secondpage;
