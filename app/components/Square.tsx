type Player = "X" | "O" | "Both" | null

interface squareProps {
  value: Player, 
  onClick: () => void, 
  winner: Player
}

const Square: React.FC<squareProps> = ({ value, onClick, winner }) => {
  if(!value){
    return (
    <button onClick={onClick} className="btn btn-block btn-primary btn-square" disabled={ Boolean(winner) }>
    {value}
    </button>
    )
  }
  
  return (
    <button className={`btn btn-block btn-primary btn-square btn-outline square_${value.toLowerCase}`} disabled>
    {value}
    </button>
  )
}

export default Square