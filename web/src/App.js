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
    console.log(startMode)
    this.setState({
      mode:startMode,
      start:true
    })
  }

render(){
  return(
    <div>
      {this.state.start==false && <FrontPage onStart={this.handleStart}></FrontPage>}
      {this.state.start==true && <Secondpage mode={this.state.mode}></Secondpage>}
    </div>
    )

}
}

export default App;
