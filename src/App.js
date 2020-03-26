import React, { Component } from "react";
import Board from "./components/Board.js";
import "./App.css";
import { checkGameIsOver } from "./Utils.js";
import MoveHistory from "./components/MoveHistory.js";
import FacebookLogin from "react-facebook-login";

let winner = false; //false is X, true is O, and null is tie
let turn = 0;
var moment = require("moment");
let startTime = 0;

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      squaresArray: ["", "", "", "", "", "", "", "", ""],
      arrayOfMoves: [],
      gameIsOver: false,
      nextPlayer: true,
      user: "",
      leaderboard: []
    }; //true corresponds to X, false to 0
  }
  resetGame = () => {
    startTime = 0;
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
      if (startTime === 0) startTime = Date.now();
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
    //when you win a game
    if (
      this.state.gameIsOver === false &&
      (winner === true || winner === null)
    ) {
      //add in the move history, before setting
      console.log("hi");
      let duration = Date.now() - startTime;
      this.postData(duration);
      this.getData();
      this.setState({ gameIsOver: true });
    }
  }
  responseFacebook = response => {
    // console.log(response);
    this.setState({ user: response.name });
  };
  postData = async duration => {
    let data = new URLSearchParams();
    // let num = this.state.arrayOfMoves.length;
    data.append("player", this.state.user);
    data.append("score", duration);
    const url = `https://ftw-highscores.herokuapp.com/tictactoe-dev`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: data.toString(),
      json: true
    });
    console.log(response);
    // We actually don't care about the response ... do we?
  };
  getData = async () => {
    const url = `https://ftw-highscores.herokuapp.com/tictactoe-dev`;
    let data = await fetch(url);
    let result = await data.json();
    console.log("data from api", result);
    // return result.items;
    this.setState({ leaderboard: result.items });
  };
  render() {
    return (
      <div>
        <h1 className="text-center mb-5">Tic Tac Toe</h1>
        <div className="row w-100">
          <div className="col-md-3 bg-warning">
            <div className="text-center mb-4">
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
                  It is player {this.state.nextPlayer === true ? "1" : "2"}'s
                  turn
                </h2>
              )}
            </div>
            <MoveHistory
              history={this.state.arrayOfMoves}
              parentMethod={turnData => this.goBackInTime(turnData)}
            />
          </div>
          <div className="col-md-6 d-flex flex-column bg-warning align-items-center">
            <div className="mb-4">
              {this.state.user === "" ? (
                <FacebookLogin
                  appId="1697520650390930"
                  autoLoad={true}
                  fields="name,email,picture"
                  callback={this.responseFacebook}
                />
              ) : (
                <h1>User info: {this.state.user}</h1>
              )}
            </div>
            <Board
              {...this.state}
              parentCallBack={obj => this.setParentState(obj)}
              turn={turn}
              postData={this.postData}
            />
          </div>
          <div className="col-md-3 d-flex flex-column align-items-center bg-warning text-dark">
            <h2>Leaderboard</h2>
            <table className="w-100 bg-dark text-warning rounded p-3">
              <tr className="p-3">
                <th>Rank</th>
                <th>Player</th>
                <th>Score</th>
                <th>Date</th>
              </tr>
              {this.state.leaderboard.length !== 0 &&
                this.state.leaderboard
                  .sort((item1, item2) => item2.score - item1.score)
                  .map((item, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{item.player}</td>
                        <td>{item.score}</td>
                        <td>{moment(item.createdAt).format("MM-DD hh:mmA")}</td>
                      </tr>
                    );
                  })}
            </table>
          </div>
        </div>
      </div>
    );
  }
}
