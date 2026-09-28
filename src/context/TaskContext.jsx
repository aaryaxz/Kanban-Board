import { createContext } from 'react'
import { useState } from 'react'

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [data, setData] = useState([])
    const [searchquery, setSearchQuery] = useState('')

    return (
        <TaskContext.Provider value={{data,setData,searchquery,setSearchQuery}}>
            {children}
        </TaskContext.Provider>
    )
}