import React, { Component } from 'react';


class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    
  }

render(){
  return(
    <div className="header">
        <div className="title">
            <h2>
                Songer
            </h2>
        </div>
        <div className="info">
            <h4>
               Username: {this.props.user}
            </h4>
            <h5>
                Room Id: {this.props.room.id}
            </h5>
        </div>
    </div>
    )

}
}

export default Header;
