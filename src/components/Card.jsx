import { Trash } from 'lucide-react'
import { Pen } from  'lucide-react'
import { useCards } from '../hooks/useCards'
import { useRef, useState } from 'react'
const Card = ({card, secondaryColor}) => {

    let {deleteCard} = useCards()
    let {updateCard} = useCards()

    const inputref = useRef()

    const handleClick = ()=>{
        const el = inputref.current
        el.focus()
        const end = el.value.length
        el.setSelectionRange(end,end)
    }
    
    return (
        <div style={{backgroundColor:secondaryColor}} className='relative bg-amber-400  w-47 h-47 border-3 border-black group shadow-[4px_4px_0px_0px_#000]
        hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#000] transition-all
        '>
        <span onClick={()=>handleClick()} className='absolute rounded-xs right-[6px] top-[8px] w-6 h-6 hidden group-hover:flex items-center justify-center transition-all cursor-pointer border border-black bg-white shadow-[1.5px_1.5px_0px_0px_#000]'> 
            <Pen size={12} />
        </span>
        <textarea ref={inputref} onChange={(e)=>updateCard(e.target.value,card.id)} defaultValue={card.content} className='w-full outline-none h-full pt-4 px-10 text-center resize-none'></textarea>
                
        <span onClick={()=>deleteCard(card.id)} className='absolute rounded-sm right-[-3px] bottom-[-3px] w-6 h-6 hidden group-hover:flex items-center justify-center bg-red-500 transition-all cursor-pointer border border-black'>
            <Trash size={15} color='white' />
        </span> 
        </div>
    )
}

export default Card