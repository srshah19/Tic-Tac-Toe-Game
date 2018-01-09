import React, {Component} from 'react';
import {createNewBoard, flattenArray} from '../services/Utils';
import './XO.css';


const initialState = {
  ready: false,
  player: 'X',
  OWins: 0,
  XWins: 0,
};

class XO extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }
  
  componentDidMount() {
    this.init();
  }
  
  // Initialize the xo board
  init() {
    // Always make board point to empty array on init
    this.board = [];
    this.createBoard();
  }
  
  createBoard() {
    let boardSize = this.props.size || 3; //If no size props is given, always default to 3x3
    this.board = createNewBoard(boardSize)
    this.setState({
      ready: true,
      player: 'X'
    })
  }
  
  _move(idx) {
    let indexes = idx.split('_');
    let geo = indexes.map(function (a) {
      return parseInt(a)
    });
    if (!this.board[geo[0]][geo[1]]) {
      this.board[geo[0]][geo[1]] = this.state.player;
      if (this.gameOver(geo[0], geo[1])) {
        alert('game over. Winner is player ' + this.state.player);
        if (this.state.player === 'O') {
          this.setState({
            OWins: this.state.OWins + 1
          })
        } else {
          this.setState({
            XWins: this.state.XWins + 1
          })
        }
        return this.init();
      }
      this.setState({
        ready: true,
        player: this.state.player === 'X' ? 'O' : 'X',
      })
    }
  }
  
  checkEquality(count) {
    return count >= this.board.length;
  }
  
  hardReset() {
    // Resets the score state of each player to initial state
    this.setState(initialState);
    this.init();
  }
  
  
  gameOver(row, col) {
    let arr = this.board;
    let length = arr[row].length;
    // Horizontal Check
    let count = 0;
    let j, i;
    for (j = 0; j < length; j++) {
      if (arr[row][j] === this.state.player) {
        count++;
      }
    }
    if (this.checkEquality(count)) {
      return true;
    } else {
      count = 0;
    }
    // Vertical Check
    for (j = 0; j < length; j++) {
      if (arr[j][col] === this.state.player) {
        count++;
      }
    }
    
    if (this.checkEquality(count)) {
      return true;
    } else {
      count = 0;
    }
    
    // Diagonal Check
    for (j = 0, i = 0; j < length; j++, i++) {
      if (arr[i][j] === this.state.player) {
        count++
      }
    }
    
    if (this.checkEquality(count)) {
      return true;
    } else {
      count = 0;
    }
    
    for (i = 0, j = length - 1; i < length; i++, j--) {
      if (arr[i][j] === this.state.player) {
        count++
      }
    }
    
    if (this.checkEquality(count)) {
      return true;
    }
    
    // check to see if game is a tie
    if (!flattenArray(this.board).includes(null)) {
      alert('This game is a tie!');
      this.init();
    }
  }
  
  render() {
    if (this.state.ready) {
      return (
        <div>
          <div className={"matrix"}>
            {this.board.map(function (arr, idx) {
              return (
                <div className="parent" key={idx}>
                  {arr.map(function (v, i) {
                    let cellIndex = `${idx}_${i}`;
                    return (
                      <div className={'cell'} key={i} onClick={this._move.bind(this, cellIndex)}
                           value={v} data-idx={cellIndex}>{v}</div>
                    );
                  }.bind(this))}
                </div>
              );
            }.bind(this))}
          </div>
          <table>
            <thead>
            <tr>
              <td>O Wins</td>
              <td>X Wins</td>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>{this.state.OWins}</td>
              <td>{this.state.XWins}</td>
            </tr>
            </tbody>
          </table>
          <button className={"btn-primary"} onClick={this.hardReset.bind(this)}>Reset Game</button>
        </div>
      )
    } else {
      return (
        <p>loading</p>
      )
    }
  }
}

export default XO;