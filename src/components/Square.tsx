import Sign from "./Sign"

type Props = {
    children?: React.ReactNode
    index: number
    updateBoard: (i: number) => void
}

const Square = (props: Props) => {
    const handleClick = () => {
        props.updateBoard(props.index)
    }
  return (
    <div className="w-24 h-24 border-2 border-gray-300 rounded-md grid place-items-center cursor-pointer text-4xl" onClick={handleClick}>
        <Sign turn={props.children as string} />
    </div>
  )
}

export default Square