import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import XO from './components/XO';

class App extends Component {
  constructor() {
    super();
    this.state = {
      size: 3
    }
  }
  
  changeSize(event) {
    this.setState({size: event.target.value});
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Welcome! This is a game of Tic Tac Toe.
            <br/>You can either select your
            desired board size from the input box (defaults to 3x3)</h1>
        </header>
        <div style={{margin: '10px'}}>
          <label htmlFor={"size"}>Select the game board size</label>
          <input type={"number"} min={3} value={this.state.size} max={10} id={"size"} onChange={this.changeSize.bind(this)}
                 placeholder={"select desired matrix size"}/>
        </div>
        <XO size={this.state.size} scoreboard={true}/>
      </div>
    );
  }
}

export default App;
