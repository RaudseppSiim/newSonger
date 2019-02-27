import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import io from 'socket.io-client';

var socket;

class ChatForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message:"",
      messages:[]
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
      if(socket.sender!==this.props.user&&socket.roomId===this.props.room.id){
      this.setState({
        message:"",
        messages:[...this.state.messages,{message:socket.message,sender:socket.sender}]})
      }
    })
  }


handleSubmit = (event) => {
  event.preventDefault();
  socket.emit('send',this.state.message,this.props.room.id,this.props.user)
  this.setState({
    message:"",
    messages:[...this.state.messages,{message:this.state.message,sender:this.props.user}]})
}

MessageValueChange = (event) =>{
  this.setState({message:event.target.value})
}

clickHandle = () =>{
  alert('click');
}

render(){
  return(
    <div className="chatElement">
      <div className="chat-area" id="chat-area" >
      {this.state.messages.map((answer, i) => {     
           console.log(answer);
           console.log(this.props.user);                

           // Return the element. Also pass key
           if (answer.sender === this.props.user){    
           return (<p className="message self" key={i}><span className="sender-self">{answer.sender}</span>{answer.message}</p>) 
          }
          else{    
            return (<p className="message" key={i}><span className="sender">{answer.sender}</span>{answer.message}</p>) 
           }
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
