import {useState} from 'react'
import '../App.css'
import Square from './Square'
import clickX from '../assets/audio/x.wav'
import clickO from '../assets/audio/o.wav'
import btnFondo from '../assets/btn-fondo.png'

const Board = ({changeBack}) => {

  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  const [scores, setScores] = useState({scoreX: 0, scoreO: 0, scoreT: 0});

  function handleClick(i) {

    if(squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextsSquares = squares.slice();
    
    if(xIsNext) {
      nextsSquares[i] = 'X';
      new Audio(clickX).play();
    } else {
      nextsSquares[i] = 'O';
      new Audio(clickO).play();
    }

    setSquares(nextsSquares);
    setXIsNext(!xIsNext);
  }

  function replay() {

    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  function calculateWinner(squares) {

    const lines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ];

    for(let i = 0; i < lines.length; i++) {

      const [a,b,c] = lines[i];
      if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  const winner = calculateWinner(squares);

  let status;

  if(winner) {
    status =  `Winner: ${winner}`;
    if(winner === 'X') {
      let {scoreX} = scores;
      scoreX += 1;
      setScores({...scores, scoreX});
    } else if (winner === 'O') {
      let {scoreO} = scores;
      scoreO += 1;
      setScores({...scores, scoreO});
    }
  }else if(!squares.includes(null)){
    status = 'Tie!'
    let {scoreT} = scores;
    scoreT += 1;
    setScores({...scores, scoreT});
  }else{
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <>
      <div>
        <div className='options'>
          <div className='status'>{status}</div>
          <button className='btn-fondo' onClick={changeBack}><img src={btnFondo} alt="btn-fondo" /></button>
        </div>
        <div className='points'>
          <span>Player (X): {scores.scoreX}</span>
          <span className='points-o'>Player (O): {scores.scoreO}</span>
          <span>Tie: {scores.scoreT}</span>
        </div>
      </div>
      <div className='game-board'>
        <div className='board-row'>
          <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
          <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
          <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
        </div>
        <div className='board-row'>
          <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
          <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
          <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
        </div>
        <div className='board-row'>
          <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
          <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
          <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
        </div>
      </div>
      {winner || !squares.includes(null) ? <button className='btn-replay' onClick={replay}>Play again</button> : ''}
    </>
  )
}

export default Board