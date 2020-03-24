import React, { Component } from "react";

export default class MoveHistory extends Component {
  myCallback = specificTurn => {
    this.props.parentMethod(specificTurn);
  };
  render() {
    return (
      <div className="d-flex flex-column align-items-center">
        <div className="w-50 d-flex flex-column">
          {this.props.history.map((item, index) => {
            return (
              <button
                id="historyButtons"
                style={styles.historyButtons}
                onClick={() => this.myCallback(item)}
              >
                Move {index + 1}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
}
const styles = {
  historyButtons: {
    outline: "none",
    border: "none",
    backgroundColor: "transparent"
  }
};
//format of props.history. An array of objects [{turn: INTEGER, board: ARRAY} ]
