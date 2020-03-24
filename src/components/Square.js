import React, { Component } from "react";

export default class Square extends Component {
  render() {
    return (
      <div
        style={{
          height: "200px",
          width: "200px",
          border: "1px solid black",
          fontSize: "18px"
        }}
        onClick={() => this.props.onClick()}
      >
        Square {this.props.value}
      </div>
    );
  }
}
