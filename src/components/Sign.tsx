type Props = {
        turn: string;
}

const Sign = ({ turn }: Props) => {
    return (
        <>
            {turn === 'X' ? <span className='text-4xl'>❌</span> : null}
            {turn === 'O' ? <span className='text-4xl'>⭕</span> : null}
        </>
    )
}

export default Sign;
