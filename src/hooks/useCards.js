import { nanoid } from "nanoid"
import { useContext } from "react"
import { TaskContext } from "../context/TaskContext"


export function useCards() {
    const {data, setData} = useContext(TaskContext)

    function addCard(columnId) {
        let card = {
            id: nanoid(),
            columnId: columnId,
            content: "New Task",
        }
        setData(prev => [...prev, card])
    }
    function deleteCard(cardId) {

        let upd_data = data.filter((card)=>card.id != cardId)
        console.log(upd_data)
        setData(upd_data)
    }

    return {
        addCard,
        deleteCard
    }
}