import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// 실행순서: Game -> Board -> Square 9번 실행
class Square extends React.Component {    

    // Square 컴포넌트를 클릭한 것을 “기억하게” 만들어 “X” 표시를 채워 넣으려고 합니다. 무언가를 “기억하기”위해 component는 state를 사용합니다.
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }
    
    render() {
    console.log("Square");
        
      return (
          // 이 버튼을 누르면 onClick 안에 있는 함수가 발동된다.
          <button
              className="square"
              onClick={() => this.props.onClick()}  // 부모가 준 onClick() 함수
          >
              {this.props.value}
          </button>
      );
    }
  }
  
class Board extends React.Component {

    // 9칸 초기화
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
        };
    }

    // 따로 뺀 함수 (클릭시 발동)
    handleClick(i) {
        const squares = this.state.squares.slice();
        squares[i] = 'X';
        this.setState({ squares: squares });
    }

    renderSquare(i) {
        // 각 Square에게 현재 값('X', 'O', 또는 null)을 표현하도록 Board를 수정
        return (
            <Square
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
            />
        );
    }
  
    render() {
      console.log("Board");
      const status = 'Next player: X';
  
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      console.log("Game");

      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  