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
        // console.log(upd_data)
        setData(upd_data)
    }

    function updateCard(content,cardId){
        let upd_data = data.map((card)=>{
            if(card.id == cardId){
                return {...card,content:content}
            }else{
                return card
            }
        })
        setData(upd_data)
    }

    function moveCardForward(cardId,index,columns){
        if(index < columns.length -1){
            let newindex = index+1
            let newcol = columns[newindex].id
    
            let upd_data = data.map((card)=>{
                if(card.id == cardId){
                    return {...card,columnId:newcol}
                }else{
                    return card
                }
            })
            setData(upd_data)
        }else{
            console.log('Index out of range!')
        }
    }       
    function moveCardBackward(cardId,index,columns){
        if( index > 0 ){
            let newindex = index-1
            let newcol = columns[newindex].id
    
            let upd_data = data.map((card)=>{
                if(card.id == cardId){
                    return {...card,columnId:newcol}
                }else{
                    return card
                }
            })
            setData(upd_data)
        }else{
            console.log('Index out of range!')
        }
    }   
    return {
        addCard,
        deleteCard,
        updateCard,
        moveCardForward,
        moveCardBackward
    }
}