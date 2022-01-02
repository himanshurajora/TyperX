import { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'

function App() {

  const [string, setString] = useState("hello there")
  
  useEffect(() => {
    var current = 0;
    document.addEventListener("keydown", (e) => {
      if(current == string.length-1){
        current == string.length-1
        console.log("The code is done guys")
      }
      if(e.key == "Backspace"){
        console.log(current)
        if(current <= 0) current = 0
        else current--
      }
      if(e.key == string[current]){
        console.log("yes")
        console.log(e.key, ": ", string[current])
        current++
      }else{
        console.log(e.key, ": ", string[current])

        console.log("no")
      }
    })
  }, [])


  return (
    <div className="App">

    </div>
  )
}

export default App
