import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// 실행순서: Game -> Board -> Square 9번 실행
function Square(props) {

    return (
        // 이 버튼을 누르면 부모가 준 onClick 함수 사용
        // 함수형으로 변경하면서 () => this.props.onClick()가 변경되었다.
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}
  
class Board extends React.Component {
    renderSquare(i) {
        // 각 Square에게 현재 값('X', 'O', 또는 null)을 표현하도록 Board를 수정
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
      return (
        <div>
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
    // [과거로 돌아가는 시간여행] 이전 동작에 대한 리스트를 보여주기 위해서는 최상위(Game) 컴포넌트에 history state를 둬야 한다.
    constructor(props) {
      super(props);
      this.state = {
        history: [ 
          {
            squares: Array(9).fill(null)
          }
        ],
        stepNumber: 0,
        xIsNext: true,
      };
    }

    // 따로 뺀 함수 (바둑판을 클릭해서 새로운 '입력'이 삽입되야 하는 경우 발동)
    handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);  // 과거로 돌아간 뒤 새로 '입력'이 되었을 경우: '미래'의 기록을 모두 날린다 (0번째 인덱스부터 stepNumber+1까지)
      const current = history[history.length - 1];
      const squares = current.squares.slice();  // slice() : current 안에 있는 squares라는 원본 배열의 복사본을 반환 (원본 배열은 수정하지 않음)

      console.log("history: ", history);
      console.log("current: ", current);
      console.log("squares: ", squares);      
      console.log("history.length: ", history.length);
      console.log("---------------------------------------");
      

      // 누군가 승리하거나 || 이미 그 칸이 채워져 있는 경우 클릭 무시
      if (calculateWinner(squares) || squares[i]) {
        return;
      }

      squares[i] = this.state.xIsNext ? 'X' : 'O';  // xIsNext 값에 따라 X와 O를 결정

      this.setState({
        history: history.concat([{ squares }]),  // push()는 기존 배열을 수정하고, concat()은 기존 배열을 변경하지 않고 대신 새 배열을 반환
        xIsNext: !this.state.xIsNext,
        stepNumber: history.length,  // 과거로 돌아가기 (i번째 턴으로 복귀)
      });
    }

    // 과거로 돌아가는 버튼 클릭시 발동
    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,  // 짝수일 경우 xIsNext를 true로 설정
      })
    }

    render() {
      const history = this.state.history;
      // const current = history[history.length - 1];
      const current = history[this.state.stepNumber];  // 항상 마지막 이동을 보여주는 것이 아니라 현재 선택된 이동을 렌더링
      const winner = calculateWinner(current.squares);


      // 과거로 돌아가는 버튼 목록 표시
      const moves = history.map((step, move) => {
        const desc = move ?
          move + "번째 턴" :
          '시작지점';

        return (
          // key : 과거의 이동 정보는 이동의 순차적인 숫자를 고유한 ID로 가짐
          <li key = {move}>
            <button onClick={() => this.jumpTo(move)}> {desc} </button>
          </li>
        );
      });

      // * 배열에 map 함수 사용 예시
      // const numbers = [1, 2, 3];
      // const doubled = numbers.map(x => x * 2);  // [2, 4, 6] -> 각 배열마다 적용
      // -----------------------------------------------------------------------


      let status;
      if (winner) {
        status = 'Winner: ' + winner;
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }

      return (
        <div className="game">
          <div className="game-board">
            <Board 
              squares={ current.squares }
              onClick={ (i) => this.handleClick(i) }
            />
          </div>
          <div className="game-info">
            <div> {status} </div>
            <ol>  {moves}  </ol>
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
        return squares[a];  // O 혹은 X를 반환
      }
    }

    return null;
  }
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  