import Board from './components/Board'
import { useState } from 'react'
import { TaskContext } from './context/TaskContext'

const App = () => {
  const [data, setData] = useState([])
  // console.log(data)
  return (
    <TaskContext.Provider value={{data, setData}}>
      <Board/>
    </TaskContext.Provider>
  )
}

export default App