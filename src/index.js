import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// 실행순서: Game -> Board -> Square 9번 실행
function Square(props) {

    // 부모로부터 전달받기 때문에 더 이상 Square가 기억할 필요가 없다!
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         value: null,
    //     };
    // }

    console.log("Square");

    return (
        // 이 버튼을 누르면 onClick 안에 있는 함수가 발동된다. (부모가 준 onClick 함수 사용)
        // 함수형으로 변경하면서 () => this.props.onClick()가 변경되었다.
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}
  
class Board extends React.Component {

    // 9칸 초기화
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,  // 플레이어가 수를 둘 때마다 xIsNext (boolean 값)이 뒤집혀 다음 플레이어가 누군지 결정
        };
    }

    // 따로 뺀 함수 (클릭시 발동)
    handleClick(i) {
        const squares = this.state.squares.slice();
        squares[i] = this.state.xIsNext ? 'X' : 'O';  // xIsNext 값에 따라 X와 O를 결정
        
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
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
      const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
  
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
  