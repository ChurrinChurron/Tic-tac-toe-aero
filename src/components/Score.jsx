import '../App.css'

const Score = ({scores}) => {

  const {scoreX, scoreO, scoreT} = scores;

  return (
    <div className='points'>
        <span>Player (X): {scoreX}</span>
        <span className='points-o'>Player (O): {scoreO}</span>
        <span>Tie: {scoreT}</span>
    </div>
  )
}

export default Score