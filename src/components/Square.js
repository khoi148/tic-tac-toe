import React, { Component } from "react";

export default class Square extends Component {
  render() {
    return (
      <div
        id="mySquare"
        className="bg-success"
        style={styles.squareStyle}
        onClick={() => this.props.onClick()}
      >
        <div className="text-center">{this.props.value}</div>
      </div>
    );
  }
}
const styles = {
  squareStyle: {
    height: "140px",
    width: "140px",
    border: "1px solid black",
    fontSize: "100px"
  }
};
