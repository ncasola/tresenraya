import { useState, useEffect } from 'react'
import Square from '../components/Square'
import Result from '../components/Result'
import { useAppContext } from '../App'
import { GameActionKind } from '../store/game.reducer'
import { checkWinner } from '../services/board.services'
import confetti from 'canvas-confetti'

export default function GameRoute() {
  const TURNS: { x: string; o: string } = { x: 'X', o: 'O' }
  const { state, dispatch } = useAppContext()
  const { squares: board, lastMove } = state
  const [turn, setTurn] = useState('')
  const [winner, setWinner] = useState(Boolean)
  const [tie, setTie] = useState(Boolean)

  const resetGame = () => {
    dispatch({ type: GameActionKind.SET_GAME, payload: { squares: Array(9).fill(null), lastMove: null } })
    setTurn(TURNS.x)
    setWinner(false)
    setTie(false)
  }
  const updateBoard = (i: number) => {
    if (board[i] || winner || tie) return
    const newBoard = board
    newBoard[i] = turn
    dispatch({ type: GameActionKind.SET_GAME, payload: { squares: newBoard, lastMove: turn } })
  }

  useEffect(() => {
    // INITIALIZE GAME
    if (!turn) {
      setTurn(lastMove === TURNS.x ? TURNS.x : TURNS.o)
    }
    // CHECK WINNER
    const newWinner = checkWinner({ board })
    if (newWinner) {
      setWinner(true)
      confetti()
      return
    }
    // CHECK TIE
    if (board.every((square) => square)) {
      setTie(true)
      return
    }
    // SET TURN
    if (lastMove) {
      setTurn(lastMove === TURNS.x ? TURNS.o : TURNS.x)
    } else {
      setTurn(TURNS.x)
    }
  }, [board, lastMove, turn, winner, TURNS.x, TURNS.o])


  return (
    <>
      <main className="container m-8 px-4">
        <h1 className='text-3xl mb-4 uppercase font-bold'>Tres en raya</h1>
        <section className='grid grid-cols-2 gap-2'>
          <div className="grid grid-cols-3 gap-2">
            {board.map((square, i) => (
              <Square
                key={i}
                index={i}
                updateBoard={(i: number) => updateBoard(i)}
              >
                {square}
              </Square>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-2">
            <Result winner={winner} tie={tie} turn={turn} resetGame={resetGame} />
          </div>
        </section>
      </main>
    </>
  )
}
