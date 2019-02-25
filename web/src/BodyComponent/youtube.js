import React, { Component } from 'react';
import Youtube from 'react-youtube'

import io from 'socket.io-client';

var socket;

class YouTube extends Component {

  constructor(props) {
    super(props);
    this.state = {
      status:true,
      room: this.props.room,
      opts: {
        playerVars: {
          modestbranding: 1,
          autoplay: 1
        }
      }
    }
    console.log(this.props.room)
    socket = props.socket;
    console.log(socket);
  }
  
  socket = null
  

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
    console.log("mount")
    socket.on('connect', async (socket) => {
      const res = await fetch('http://localhost:8000/rooms')
      const { payload } = await res.json()
        console.log(payload);
      this.setState({ room: payload[0] })

      this.socket = socket
      console.log('Socket connected')
      console.log(this.state.room)
    })
    socket.on('pause',async (socket) => {
      if(this.event.data !== 2)
        this.event.target.pauseVideo();
    })
    socket.on('start',async (socket) => {
      console.log(this.event.target)
    if(this.event.data !== 1)
      this.event.target.playVideo();
    })
    socket.on('next', async (socket) => {
      let i = setInterval(() => {
          clearInterval(i)
          this.event.target.playVideo();
      }, 1000);
      console.log('next')
      await this.event.target.cueVideoById(this.state.room.currentVideo.id,0,"default");
     
    })
    socket.on('seek', async (socket) => {
      console.log(socket)
      if(this.event.data !== 1)
        this.event.target.seekTo(socket[1]);
    })
  }

  startVideo = async (event) => {
    console.log("start");
    const socket = await this.getSocket()
    const roomId = await this.getRoom()
    this.event = null;
    this.event = event
    var positsion = event.target.getCurrentTime()
    console.log(positsion)
    socket.emit('start', roomId.id)
    socket.emit('seek', [roomId.id, positsion])
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
      <div className="Youtube">
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

export default YouTube;
