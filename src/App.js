import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    turn: "X",
    gameOver: false,
    board: Array(9).fill(""),
    totalMoves: 0,
    winner: ""
  };

  handleClick(event) {
    if (this.state.gameOver) return;
    if (this.state.board[event.target.dataset.square] === "") {
      this.state.board[event.target.dataset.square] = this.state.turn;

      event.target.innerText = this.state.turn;
      event.target.className = this.state.turn === "X" ? "square x" : "square o";
      this.setState({
        turn: this.state.turn === "X" ? "O" : "X",
        board: this.state.board,
        totalMoves: ++this.state.totalMoves
      });
    }

    let result = this.winningPlayerControl();
    if (result === "X") {
      this.setState({
        gameOver: true,
        winner: "X"
      });
    } else if (result === "O") {
      this.setState({
        gameOver: true,
        winner: "O"
      });
    } else if (result === "togetherness") {
      this.setState({
        gameOver: true,
        winner: result
      });
    }
  }

  winningPlayerControl() {
    let board = this.state.board;
    let winnigMoves = [
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8]
    ];

    for (let i = 0; i < winnigMoves.length; i++) {
      if (
        board[winnigMoves[i][0]] === board[winnigMoves[i][1]] &&
        board[winnigMoves[i][1]] === board[winnigMoves[i][2]]
      ) {
        return board[winnigMoves[i][0]];
      }
    }

    if (this.state.totalMoves === 9) {
      return "togetherness";
    }
  }

  cleaningBoard() {
    for (let i = 0; i < document.getElementsByClassName("square").length; i++) {
      document.getElementsByClassName("square")[i].innerHTML = "";
    }

    this.setState({
      turn: "X",
      gameOver: false,
      board: Array(9).fill(""),
      totalMoves: 0,
      winner: ""
    });
  }

  render() {
    return (
      <div className="App">
        <div className="game">
          <div className="head">Tic-Tac-Toe Game</div>
          {this.state.gameOver ? <div className="winner"> Winner : {this.state.winner}</div> : ""}
          <div
            className="board"
            onClick={e => {
              this.handleClick(e);
            }}
          >
            <div className="square" data-square="0"></div>
            <div className="square" data-square="1"></div>
            <div className="square" data-square="2"></div>
            <div className="square" data-square="3"></div>
            <div className="square" data-square="4"></div>
            <div className="square" data-square="5"></div>
            <div className="square" data-square="6"></div>
            <div className="square" data-square="7"></div>
            <div className="square" data-square="8"></div>
          </div>
          {this.state.gameOver ? (
            <div
              className="clean-board"
              onClick={() => {
                this.cleaningBoard();
              }}
            >
              PLAY AGAIN
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default App;
