import Board from './components/Board'
import { useEffect, useState } from 'react'
import { TaskContext } from './context/TaskContext'
import Navbar from './components/Navbar'

const App = () => {
  const [data, setData] = useState([])
  const [searchquery, setSearchQuery] = useState('')
  return (
    <TaskContext.Provider value={{data, setData, searchquery,setSearchQuery}}>
      <Navbar/>
      <Board/>
    </TaskContext.Provider>
  )
}

export default App