import React, { Component } from "react";
import Board from "./components/Board.js";
import "./App.css";
import { checkGameIsOver } from "./Utils.js";
import MoveHistory from "./components/MoveHistory.js";

let winner = false; //false is X, true is O, and null is tie
let turn = 0;
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      squaresArray: ["", "", "", "", "", "", "", "", ""],
      arrayOfMoves: [],
      gameIsOver: false,
      nextPlayer: true
    }; //true corresponds to X, false to 0
  }
  resetGame = () => {
    this.setState({
      squaresArray: ["", "", "", "", "", "", "", "", ""],
      arrayOfMoves: [],
      gameIsOver: false,
      nextPlayer: true
    });
  };
  //takes input board = {squaresArray: copyArray, nextPlayer: !this.props.nextPlayer, turn: INTEGER } from Board.js
  setParentState = board => {
    if (this.state.gameIsOver === false) {
      this.setMoveHistory(board.squaresArray, board.turn);
      this.setState(board); //setting Board and NextPlayer after a click. Switches to other player
      console.log("turn", turn);
      ++turn;
    }
  };
  setMoveHistory = (boardState, turn) => {
    // console.log(turn);
    //only insert the next board state in the history array, where current turn is higher than the first lower turn
    let curr = { arrayOfMoves: this.state.arrayOfMoves };
    let historyObj = {
      turn: turn,
      board: boardState,
      player: this.state.nextPlayer
    };
    //remember that turn value is currently on the next turn to be implemented. so if [0,1,2,3] turn would be 4
    let resultIndex = curr.arrayOfMoves.findIndex(item => turn <= item.turn);
    if (resultIndex === -1) {
      curr.arrayOfMoves.push(historyObj);
      this.setState(curr);
    } else {
      //input element into that index in array, since that turn already exists. Also delete all future turns from that point
      let arrayCopy = curr.arrayOfMoves.slice(0, resultIndex);
      arrayCopy.push(historyObj);
      this.setState({ arrayOfMoves: arrayCopy });
    }
  };
  goBackInTime = turnData => {
    //turndata is {turn: INTEGER, board: ARRAY, player: BOOLEAN}
    console.log("well", turnData);
    //1. set if game is over or not on this turn,
    //2. And set current Player to past move
    //3. set new Board
    turn = turnData.turn + 1; //set the new next turn as well
    console.log("well turn", turn);
    this.setState({
      gameIsOver: checkGameIsOver(turnData.board),
      nextPlayer: !turnData.player,
      squaresArray: turnData.board
    });
  };

  componentWillUpdate(nextProps, nextState) {
    winner = checkGameIsOver(nextState.squaresArray);
    if (
      this.state.gameIsOver === false &&
      (winner === true || winner === null)
    ) {
      //add in the move history, before setting
      this.setState({ gameIsOver: true });
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-8 d-flex flex-column align-items-center">
          <h1>Tic Tac Toe</h1>

          <Board
            {...this.state}
            parentCallBack={obj => this.setParentState(obj)}
            turn={turn}
          />
        </div>
        <div className="col-md-4 bg-warning">
          <div className="text-center my-5">
            {this.state.gameIsOver === true && (
              <div className="d-flex flex-columns align-items-center my-3">
                <div className="w-100">
                  {winner === null ? (
                    <h2>It's a tie!</h2>
                  ) : (
                    <h2>
                      The winner is{" "}
                      {this.state.nextPlayer === false
                        ? "Player 1"
                        : "Player 2"}
                    </h2>
                  )}
                  <button
                    className="btn bg-dark text-warning"
                    onClick={() => this.resetGame()}
                  >
                    Reset Game
                  </button>
                </div>
              </div>
            )}
            {this.state.gameIsOver !== true && (
              <h2>
                It is player {this.state.nextPlayer === true ? "1" : "2"}'s turn
              </h2>
            )}
          </div>
          <MoveHistory
            history={this.state.arrayOfMoves}
            parentMethod={turnData => this.goBackInTime(turnData)}
          />
        </div>
      </div>
    );
  }
}
