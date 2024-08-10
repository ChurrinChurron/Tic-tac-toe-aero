import {useState} from 'react'
import '../App.css'
import Square from './Square'
import Score from './Score';
import clickX from '../assets/audio/x.wav'
import clickO from '../assets/audio/o.wav'
import btnFondo from '../assets/btn-fondo.png'

const Board = ({changeBack}) => {

  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(0));
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

    if(winner) {
      if(winner === "X") {
        let {scoreX} = scores;
        scoreX += 1;
        setScores({...scores, scoreX});
      } else {
        let {scoreO} = scores;
        scoreO += 1;
        setScores({...scores, scoreO});
      } 
    } else {
        let {scoreT} = scores;
        scoreT += 1;
        setScores({...scores, scoreT});
    }

    setSquares(Array(9).fill(0));
    xIsNext ? setXIsNext(true) : setXIsNext(false);
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
  }else if(!squares.includes(0)){
    status = 'Tie!'
  }else{
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <>
      <div>
        <div className='options'>
          <div className='status'>{status}</div>
          <button className='btn-fondo' onClick={() => changeBack()}><img src={btnFondo} alt="btn-fondo" /></button>
        </div>
        <Score scores={scores}/>
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
      {winner || !squares.includes(0) ? <button className='btn-replay' onClick={() => replay()}>Play again</button> : ''}
    </>
  )
}

export default Board