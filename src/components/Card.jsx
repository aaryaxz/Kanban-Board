import { Pen, Trash,ChevronRight,ChevronLeft } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useCards } from '../hooks/useCards'

const Card = ({card, secondaryColor,index,columns}) => {
    const { deleteCard, updateCard , moveCardForward, moveCardBackward } = useCards()
    const inputRef = useRef(null)

    const [isEditing, setIsEditing] = useState(false)

    const editCard = () => {
        setIsEditing(true)
    }

    useEffect(()=>{
        if(!isEditing) return
        inputRef.current.focus()
        const end = inputRef.current.value.length
        inputRef.current.setSelectionRange(end, end)
    },[isEditing])

    return (
        <div style={{ backgroundColor: secondaryColor }} className={`relative w-47 h-47  border-2  group shadow-[4px_4px_0px_0px_#000] hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#000] transition-all`}>
            <button type="button" aria-label="Edit task" onClick={editCard} className="absolute right-2 top-2 w-6 h-6 hidden group-hover:flex items-center justify-center cursor-pointer border bg-white shadow-[1.5px_1.5px_0px_0px_#000] rounded-sm">
                <Pen size={12} />
            </button>

            <textarea 
            ref={inputRef} 
            readOnly={!isEditing}
            onDoubleClick={()=>setIsEditing(true)} 
            onBlur={()=>setIsEditing(false)} 
            onMouseDown={(e)=>{
                if(!isEditing){
                    e.preventDefault()
                }
            }}

            aria-label="Task content" onChange={(event) => updateCard(event.target.value, card.id)} value={card.content} className={`w-full h-full pt-4 px-10 pb-16 text-center resize-none outline-none ${isEditing?'cursor-text':'cursor-default'} ${isEditing ? 'select-none':'select-auto'}` } /> 

            <button type="button" aria-label="Delete task" onClick={() => deleteCard(card.id)} className="absolute right-[-3px] bottom-[-3px] w-6 h-6 hidden group-hover:flex items-center justify-center bg-[#FF2E43] cursor-pointer border rounded-sm ">
                <Trash size={15} color="white" />
            </button>

            <div className='move-card-btn bg-amber-500 absolute bottom-0 border flex justify-center items-center'>
                <button onClick={()=>moveCardBackward(card.id,index,columns)} className='border-r left-btn cursor-pointer'>
                    <ChevronLeft size={24}/>
                </button>
                <button onClick={()=>moveCardForward(card.id,index,columns)}  className='right-btn cursor-pointer'>
                    <ChevronRight size={24}/>
                </button>
            </div>
        </div>
    )
}

export default Card