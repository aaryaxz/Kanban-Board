import { useContext } from "react"
import Column from "./Column"
import { ColumnContext } from "../context/ColumnContext"
import { DndContext } from "@dnd-kit/core"
import { TaskContext } from "../context/TaskContext"

const Board = () => {
    const {columns} = useContext(ColumnContext)
    const {data,setData} = useContext(TaskContext)

    function handleDragEnd(event){
        const {active , over} = event   
        let upd_data = data.map((task,index)=>{
            if(task.id === active.id){
                return {...task,columnId:over.id}
            }
            else{
                return task
            }
        })
        setData(upd_data)

        console.log('Dragged:', active.id)
        console.log("Dropped over: ", over.id)
    }
    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div className="w-full h-full flex bg-rose-500 overflow-hidden">
                {columns.map((column, index)=>{
                    return <Column key={column.id} index={index} column={column} />
                })}
            </div>
        </DndContext>

    )
}

export default Board