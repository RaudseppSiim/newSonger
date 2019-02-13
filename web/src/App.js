import React, { Component } from 'react';
import Youtube from 'react-youtube'

import io from 'socket.io-client';

var socket = io.connect('http://localhost:8000');
var event;
console.log(socket)
class App extends Component {

  state = {
    status:true,
    room: null,
    opts: {
      playerVars: {
        modestbranding: 1,
        autoplay: 1
      }
    }
  }
  socket = null;
  

  getRoom = () => {
    return new Promise(resolve => {
      let i = setInterval(() => {
        const { room } = this.state
        if (room) {
          clearInterval(i)
          resolve(room)
        }
      }, 300);
    })
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
    socket.on('connect', async (socket) => {
      const res = await fetch('http://localhost:8000/rooms')
      const { payload } = await res.json()
      this.setState({ room: payload[0] })

      this.socket = socket
      console.log('Socket connected')
    })
    socket.on('pause',async (socket) => {
      if(this.event.data !== 2)
        this.event.target.pauseVideo();
    })
    socket.on('start',async (socket) => {
    if(this.event.data !== 1)
      this.event.target.playVideo();
    })
  }

  startVideo = async (event) => {
    console.log("start");
    const socket = await this.getSocket()
    const roomId = await this.getRoom()
    this.event = null;
    this.event = event
    socket.emit('start', await roomId.id)
  }

  pauseVideo = async (event) => {
    const socket = await this.getSocket()
    const roomId = await this.getRoom()
    console.log(roomId.id)
    this.event = null;
    this.event = event
    socket.emit('pause',roomId.id)
  }

  next = async () => {
    const socket = await this.getSocket()
    const roomId = await this.getRoom()
    socket.emit('next', roomId.id);
  }

  render() {
    const { opts, room } = this.state

    return (
      <div className="App">
        {room && room.currentVideo &&(
          <Youtube
            videoId={room.currentVideo.id}
            onReady={this.onReady}
            opts={opts}
            onPlay={this.startVideo}
            onPause={this.pauseVideo}
            onEnd={this.next}
          />
        )}
      </div>
    );
  }
}

export default App;
