import { ReactComponent as Cup } from '../assets/cup.svg'
import { ReactComponent as Equal } from '../assets/equal.svg'
import Sign from './Sign'

type Props = {
    winner: boolean
    tie: boolean
    turn: string
    resetGame: () => void
}

const Result = (props: Props) => {
    const { winner, tie, turn, resetGame } = props
  return (
    <div>
        {(tie || winner) && (
            <div className="flex flex-col items-center justify-center">
                <h2 className='text-2xl mb-4'>
                    {tie && 'Empate'}
                    {winner && (
                        <>
                            Ganador
                            <Sign turn={turn} />
                        </>
                    )}
                </h2>
                {tie ? <Equal className='w-24 h-24 mb-4' /> : <Cup className='w-24 h-24 mb-4' />}
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={resetGame}>Reiniciar</button>
            </div>
        )}
    </div>
  )
}

export default Result