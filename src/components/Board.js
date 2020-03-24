import React, { Component } from "react";
import Square from "./Square.js";

export default class Board extends Component {
  onSquareClick = index => {
    //copy square array
    let copyArray = this.props.squaresArray.slice();
    //put X or O
    if (copyArray[index] === "") {
      if (this.props.nextPlayer) copyArray[index] = "X";
      else copyArray[index] = "0";
      let obj = { squaresArray: copyArray, nextPlayer: !this.props.nextPlayer };
      this.props.parentCallBack(obj);
    }
  };

  render() {
    return (
      <div>
        <div className="d-flex">
          <Square
            value={this.props.squaresArray[0]}
            onClick={() => this.onSquareClick(0)}
          />
          <Square
            value={this.props.squaresArray[1]}
            onClick={() => this.onSquareClick(1)}
          />
          <Square
            value={this.props.squaresArray[2]}
            onClick={() => this.onSquareClick(2)}
          />
        </div>
        <div className="d-flex">
          <Square
            value={this.props.squaresArray[3]}
            onClick={() => this.onSquareClick(3)}
          />
          <Square
            value={this.props.squaresArray[4]}
            onClick={() => this.onSquareClick(4)}
          />
          <Square
            value={this.props.squaresArray[5]}
            onClick={() => this.onSquareClick(5)}
          />
        </div>
        <div className="d-flex">
          <Square
            value={this.props.squaresArray[6]}
            onClick={() => this.onSquareClick(6)}
          />
          <Square
            value={this.props.squaresArray[7]}
            onClick={() => this.onSquareClick(7)}
          />
          <Square
            value={this.props.squaresArray[8]}
            onClick={() => this.onSquareClick(8)}
          />
        </div>
      </div>
    );
  }
}
