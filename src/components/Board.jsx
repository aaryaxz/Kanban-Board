import { useContext } from "react"
import Column from "./Column"
import { ColumnContext } from "../context/ColumnContext"
import { TaskContext } from "../context/TaskContext";
import { DragDropProvider } from "@dnd-kit/react";

const Board = () => {
    const { columns } = useContext(ColumnContext)
    const { data, setData } = useContext(TaskContext)

    function handleDragEnd(event) {
        const { source, target } = event.operation

        let upd_data = data.map((task) => {
            if (task.id === source.id) {
                return { ...task, columnId: target.id }
            }
            else {
                return task
            }
        })
        setData(upd_data)

        console.log('Dragged Card:', source.id)
        console.log('Dropped On:', target.id)
    }

    return (
        <DragDropProvider onDragEnd={handleDragEnd}>
            <div className="w-full h-full flex bg-rose-500 overflow-hidden">
                {columns.map((column, index) => {
                    return <Column key={column.id} index={index} column={column} />
                })}
            </div>
        </DragDropProvider>

    )
}

export default Board