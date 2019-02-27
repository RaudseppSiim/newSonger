import React, { Component } from 'react';


class PlayerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
        players:[]
    };
    
  }
  componentDidMount(){
      console.log("heello")
      console.log(this.props.socket)
    this.props.socket.emit('joined',null)
    this.props.socket.on('players', async (socket) => {
        const res = await fetch('http://localhost:8000/users/room/'+this.props.room.id)
        const { payload } = await res.json()
        console.log(payload)
        this.setState({ players: payload })
    })
  }

render(){
  return(
    <div className="playerList">
       {this.state.players.map((answer, i) => {     
           console.log(answer);               

           // Return the element. Also pass key
           return (<div  className = "joined-user" key={i}>{answer.name}</div>)
        })}
    </div>
    )

}
}

export default PlayerList;
