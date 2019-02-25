import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import io from 'socket.io-client';

var socket;

class ChatForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message:"",
      messages:["Tere","Mina","Olen","Siim"]
    };
    socket = props.socket;
    console.log(socket); 
  }
  
  

  getSocket = () => {
    return new Promise(resolve => {
      let i = setInterval(() => {
        console.log(socket)
        if (socket) {
          clearInterval(i)
          resolve(socket)
        }
      }, 300);
    })
  }

  componentDidMount() {
    socket.on('receive', async (socket)=>{
      console.log(socket)
      this.setState({
        message:"",
        messages:[...this.state.messages,socket.message]})
    })
  }


handleSubmit = (event) => {
  event.preventDefault();
  socket.emit('send',this.state.message,"35b")
  this.setState({
    message:"",
    messages:[...this.state.messages,this.state.message]})
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
      {this.state.messages.map((answer, i) => {     
           console.log("Entered");                 
           // Return the element. Also pass key     
           return (<p className="message" key={i}>{answer}</p>) 
        })}
      </div>
        <form className="chat-form" onSubmit={this.handleSubmit}>
          <input placeholder="Message" className="Text-input" type={Text} value={this.state.message} onChange={this.MessageValueChange}></input>
          <input type="submit" hidden></input>
        </form>
    </div>
    )

}
}

export default ChatForm;
