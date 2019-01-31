import React, { Component } from 'react';
import Youtube from 'react-youtube'

import io from 'socket.io-client';

var socket = io.connect('http://localhost:8000');

class App extends Component {

  state = {
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
        if (this.socket) {
          clearInterval(i)
          resolve(this.socket)
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
  }z

  startVideo = async (event) => {
    const socket = await this.getSocket()

    socket.emit('start', this.getRoom().id)
  }

  pauseVideo = async (event) => {
    const socket = await this.getSocket()
    
    socket.emit('pause', this.getRoom().id)
  }

  next = async () => {
    const socket = await this.getSocket()
    
    socket.emit('next', this.getRoom().id);
  }

  render() {
    const { opts, room } = this.state

    return (
      <div className="App">
        {room && room.currentVideo && (
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
