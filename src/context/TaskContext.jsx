import { createContext, useEffect } from 'react'
import { useState } from 'react'

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [data, setData] = useState(()=>{
        const saved = localStorage.getItem('tasks') 
        return saved ? JSON.parse(saved) : []   
    })
    
    useEffect(()=>{
        localStorage.setItem('tasks',JSON.stringify(data))
        
    },[data])
    const [searchquery, setSearchQuery] = useState('')

    return (
        <TaskContext.Provider value={{data,setData,searchquery,setSearchQuery}}>
            {children}
        </TaskContext.Provider>
    )
}