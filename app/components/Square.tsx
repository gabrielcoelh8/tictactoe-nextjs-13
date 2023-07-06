type Player = "X" | "O" | null

interface squareProps {
  value: string | null, 
  onClick: () => void, 
  winner: string | null
}

const Square: React.FC<squareProps> = ({ value, onClick, winner }) => {

  if(!value){
    return <button className="btn" disabled={ Boolean(winner) }>
      Square
    </button>
  }
  
  return (
    <button className={`btn square_${value.toLocaleLowerCase}`} disabled>
      Square</button>
  )
  
}

export default Square