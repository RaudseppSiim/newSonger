import React, { Component } from 'react';

import io from 'socket.io-client';

var socket = io.connect('http://localhost:8000');


class App extends Component {
render(){
  return(
    <div>
      <form>
        <label>
        Name:<input type="text" name= "name"/>
        </label>
        <label>
        Song:<input type="text" name= "song"/>
        </label>
        <input type="submit" value="Sumbit"/>
      </form>
    </div>
    )

}
}

export default App;
