import React, { Component } from "react";
import Board from "./components/Board.js";
import "./App.css";
import { checkGameIsOver } from "./Utils.js";
import MoveHistory from "./components/MoveHistory.js";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      squaresArray: ["", "", "", "", "", "", "", "", ""],
      arrayOfMoves: [],
      gameIsOver: false,
      nextPlayer: true
    };
  }
  resetGame = () => {
    this.setState({
      squaresArray: ["", "", "", "", "", "", "", "", ""],
      arrayOfMoves: [],
      gameIsOver: false,
      nextPlayer: true
    });
  };
  setParentState = obj => {
    //receives newSquares array from Board.js onclick
    if (this.state.gameIsOver === false) {
      // let obj = { gameIsOver: true, arrayOfMoves: this.state.arrayOfMoves };
      // this.setMoveHistory(obj)
      this.setState(obj);
    }
    console.log(this.state.squaresArray);
  };

  setMoveHistory = obj => {
    let historyObj = {
      turn: 0,
      board: this.state.squaresArray
    };
    obj.arrayOfMoves.push(historyObj);
    console.log("hi", obj);
    return obj;
  };

  componentWillUpdate(nextProps, nextState) {
    if (
      this.state.gameIsOver === false &&
      checkGameIsOver(nextState.squaresArray) === true
    ) {
      //add in the move history, before setting
      this.setState({ gameIsOver: true });
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-8">
          <h1>Tic Tac Toe</h1>
          {this.state.gameIsOver === true && (
            <div className="d-flex align-items-center justify-content-between w-25 border my-3">
              <h1 style={styles.fontSize1}>Game is Over</h1>
              <button
                style={styles.fontSize1}
                className="btn bg-primary"
                onClick={() => this.resetGame()}
              >
                Reset Game
              </button>
            </div>
          )}
          <Board
            {...this.state}
            parentCallBack={obj => this.setParentState(obj)}
          />
        </div>
        <div className="col-4">
          It is player {this.state.nextPlayer ? "1" : "2"}'s turn
          {console.log(this.state.arrayOfMoves)}
          <MoveHistory history={this.state.arrayOfMoves} />
        </div>
      </div>
    );
  }
}

const styles = {
  fontSize1: { fontSize: "10px" }
};
