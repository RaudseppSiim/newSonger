import React, { Component } from 'react';

import io from 'socket.io-client';

var socket = io.connect('http://localhost:8000');


class Frontpage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    
  }

clickHandleCreate = () =>{
  this.props.onStart("Create");
}

clickHandleCreate = () =>{
  this.props.onStart("Join");
}

render(){
  return(
    <div>
      <div className="frontpage-container">
        <div className="title">
          <h3>Songer</h3>
        </div>
        <div className="buttons-container">
            <div className="button" onClick={this.clickHandleCreate}>Create Room</div>
            <div className="button"onClick={this.clickHandleJoin}>Join Room</div>
        </div>
      </div>
      <div className="background">
      </div>
    </div>
    )

}
}

export default Frontpage;
