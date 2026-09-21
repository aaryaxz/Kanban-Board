import Board from './components/Board'
import { useState } from 'react'

const App = () => {
  const [data, setData] = useState([])
  return (
      <Board/>
  )
}

export default App