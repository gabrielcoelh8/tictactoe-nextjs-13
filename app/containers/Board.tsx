"use client"
import { useEffect, useState } from "react"
import Square from "../components/Square"
type Player = "X" | "O" | "Both" | null

function calculateWinner(squares: Player[]){ //refatorate this function pls
    const lines =[
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1 ,4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]

    for(let i = 0; i < lines.length; i++){
        const [a, b, c] = lines[i]
        if(
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]) {
                return squares[a]
        }
       
    }
    return null
}

function Board() {
        const [squares, setSquares] = useState(Array(9).fill(null))
        const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">()
        const [winner, setWinner] = useState<Player>(null);

        useEffect(() => {
            setCurrentPlayer(Math.round(Math.random() * 1) === 1 ? "X" : "O");
            //preload the first current player by random (Hydration)
        }, []); 

        function reset() {
            setSquares(Array(9).fill(null))
            setWinner(null)
            setCurrentPlayer(Math.round(Math.random() * 1) === 1 ? "X" : "O")
        }
        function setSquareValue(index: number) {
            const newData = squares.map((val, i) => {
            if(i === index) {
                return currentPlayer
            }
            return val;
        })
        setSquares(newData)
        setCurrentPlayer(currentPlayer === "X" ? "O" : "X")
    }

    useEffect(() => {
        const w = calculateWinner(squares);
        if (w) {
          setWinner(w);
        }
    
        if (!w && !squares.filter((square) => !square).length) {
          setWinner('Both');
        }
      });

    return (
        <div className="text-center my-6">
            {!winner && <p className="text-2xl font-bold">Hey {!currentPlayer ? <span className="loading loading-spinner text-sky-400"></span> : currentPlayer}, it's your turn!</p>}
            
            {winner && winner !== "Both" && <p className="text-2xl font-bold">Congrats {winner}!</p>}

            {winner && winner === "Both" && <p className="text-2xl font-bold">Congrats you both!</p>}
            
            <div className="my-5 grid grid-cols-3 gap-3">
            {Array(9)
                .fill(null)
                .map((_, i) => {
                    return (
                    <Square
                        winner={winner}
                        key={i}
                        onClick={() => setSquareValue(i)}
                        value={squares[i]}
                    />
                    ); 
                })
            }
            </div>

            <div className="btn btn-secondary" onClick={reset}>Reset</div>
        </div>
    )
}

export default Board