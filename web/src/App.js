import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YouTube from './BodyComponent/youtube'
import FrontPage from './FrontPageComponent/frontpage'
import ChatForm from './BodyComponent/chatForm'

import io from 'socket.io-client';



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message:""
    };

    
  }

render(){
  return(
    <div>
        <ChatForm></ChatForm>
    </div>
    )

}
}

export default App;
