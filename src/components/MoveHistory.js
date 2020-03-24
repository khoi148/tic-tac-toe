import React, { Component } from "react";

export default class MoveHistory extends Component {
  render() {
    return (
      <div>
        {console.log(this.props.history)}
        List {this.props.history}
      </div>
    );
  }
}
