import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YouTube from './BodyComponent/youtube'
import FrontPage from './FrontPageComponent/frontpage'
import ChatForm from './BodyComponent/chatForm'

import io from 'socket.io-client';
import Secondpage from './secondPage/secondPage';



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      start:false,
      mode:""
    };
  }
  handleStart = (startMode) => {
    this.setState({
      start:true,
      mode:startMode
    })
  }

render(){
  return(
    <div>
      {this.state.start==false && <FrontPage onStart={this.handleStart}></FrontPage>}
      {this.state.start==true && <Secondpage mode={this.state.startMode}></Secondpage>}
    </div>
    )

}
}

export default App;
