import React, { Component } from 'react';

import io from 'socket.io-client';

var socket = io.connect('http://localhost:8000');


class Secondpage extends Component {

clickHandle = () =>{
  alert('click');
}

render(){
  return(
    <div>
      <div></div>
    </div>
    )
  }
}

export default Secondpage;
