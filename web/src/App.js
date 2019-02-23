import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YouTube from './BodyComponent/youtube'

import io from 'socket.io-client';



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message:""
    };

    
  }

handleSubmit = (event) => {
  event.preventDefault();
  const element = (
    <p className="message">{this.state.message}</p>
  );
  ReactDOM.render(element, document.getElementById('chat-area'));
  this.setState({message:""})
}

MessageValueChange = (event) =>{
  this.setState({message:event.target.value})
}

clickHandle = () =>{
  alert('click');
}

render(){
  return(
    <div>
      <div className="chat-area" id="chat-area" >
        
      </div>
        <form className="chat-form" onSubmit={this.handleSubmit}>
          <input placeholder="Message" className="Text-input" type={Text} value={this.state.message} onChange={this.MessageValueChange}></input>
          <input type="submit" hidden></input>
        </form>
    </div>
    )

}
}

export default App;
