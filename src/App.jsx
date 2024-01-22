import React, {useEffect} from 'react'
import './App.css'
import Home from './components/Home'

function App() {
  const apiKey = import.meta.env.VITE_MY_API_KEY;

  return (
    <div className=''>
      <Home apiKey={apiKey}/>
    </div>
  )
}

export default App
