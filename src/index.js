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

        // 누군가 승리하거나 || 이미 그 칸이 채워져 있는 경우 클릭 무시
        if (calculateWinner(squares) || squares[i]) {
            return;
        }

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

        const winner = calculateWinner(this.state.squares);

        let status;  // 승리한 경우 승리 문구 띄우기
        if (winner) {
            status = 'Winner: ' + winner;
        } 
        
        else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
  
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
  

  // ================================================
  // 승부가 나는 때와 더 이상 둘 곳이 없을 때를 알려주는 도우미 함수
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],  // 가로 1줄
      [3, 4, 5],  // 가로 2줄
      [6, 7, 8],  // 가로 3줄
      [0, 3, 6],  // 세로 1줄
      [1, 4, 7],  // 세로 2줄
      [2, 5, 8],  // 세로 3줄
      [0, 4, 8],  // 왼쪽 대각선 1줄
      [2, 4, 6],  // 우측 대각선 1줄
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      
      // 1줄 전체가 OOO, XXX 이렇게 되면 반환
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    return null;
  }
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  