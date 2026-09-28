import { TaskProvider } from './context/TaskContext'
import { ColumnProvider } from './context/ColumnContext'
import Navbar from './components/Navbar'
import Board from './components/Board'

const App = () => {
  return (
    <ColumnProvider>
      <TaskProvider>
        <Navbar/>
        <Board/>
      </TaskProvider>
    </ColumnProvider>
  )
}

export default App