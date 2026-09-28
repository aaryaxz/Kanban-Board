import { useContext } from "react"
import Column from "./Column"
import { ColumnContext } from "../context/ColumnContext"

const Board = () => {
    const {columns} = useContext(ColumnContext)
    return (
        <div className="w-full h-full flex">
            {columns.map((column, index)=>{
                return <Column key={column.id} index={index} column={column} />
            })}
        </div>

    )
}

export default Board