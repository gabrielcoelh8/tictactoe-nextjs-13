"use client"
import { useEffect, useState } from "react"
import Square from "../components/Square"

function Board() {
        const [squares, setSquares] = useState(Array(9).fill(null))
        const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">()
        useEffect(() => {
            setCurrentPlayer(Math.round(Math.random() * 1) === 1 ? "X" : "O");
        }, []); //preset the first load current player by random (debug)
        const [winner, setWinner] = useState(null);
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

    return (
        <div className="text-center my-6">
            <p className="text-2xl font-bold">Hey {!currentPlayer ? <span className="loading loading-spinner text-sky-400"></span> : currentPlayer}, it's your turn!</p>
            
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