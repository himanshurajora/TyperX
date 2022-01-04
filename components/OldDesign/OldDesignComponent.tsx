import { useEffect, useRef, useState } from 'react'
// import logo from '../../src/logo.svg'
import './App.css'
// import app from './init'
import Navbar from '../Navbar/Navbar'

declare interface CodeBlock {
  character: string
  // Here C = yes the chracter has been attempted and correct # Currect
  // Here I  the caracter has been attempted but is wrongly typed # Incorrect
  // U = The character has no been attempted yet # Unattempted
  // R = THe charater that has to be written right now or the current index # current index
  status: "C" | "I" | "U" | "R"
}
function App() {
  var init = `void main`
  const [code, setCode] = useState(init)
  const [codeMap, setCodeMap] = useState<CodeBlock[]>([])
  var currentIndexRef = useRef(0)
  var modelRef = useRef<any>()
  var modelCloseButtonRef = useRef<any>()
  var textArea = useRef<any>()
  const ignoredKeys = [
    "Shift",
    "Control",
    "Alt",
    "CapsLock",
    "Escape",
    "Meta",
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "ArrowDown",
  ]
  useEffect(() => {
    // Make the code map from code string 
    let tempCodeMap: CodeBlock[] = []
    code.split("").forEach((char) => {
      // current code block 
      var codeBlock: CodeBlock = {
        character: char,
        status: "U"
      }

      tempCodeMap.push(codeBlock)
    })

    setCodeMap(tempCodeMap)

  }, [code])



  const handleCodeDown = (e: any) => {
    let currentIndex = currentIndexRef.current
    console.log(currentIndex)
    if (currentIndex < codeMap.length) {
      if (e.key === "Tab") {
        e.preventDefault()
      }
      if (ignoredKeys.includes(e.key)) {
        return
      }
      if (e.key === "Enter" && codeMap[currentIndex].character === "\n") {
        // If the user has pressed enter then we need to move the cursor to the next line
        // We need to find the next line
        codeMap[currentIndex++].status = "C"
        codeMap[currentIndex].status = "R"
        setCodeMap([...codeMap])
        currentIndexRef.current = currentIndex
        return
      } else if (e.key === "Tab" && codeMap[currentIndex].character === "\t") {
        // If the user has pressed enter then we need to move the cursor to the next line
        // We need to find the next line
        codeMap[currentIndex++].status = "C"
        codeMap[currentIndex].status = "R"
        setCodeMap([...codeMap])
        currentIndexRef.current = currentIndex
        return
      }
      else if (e.key === "Backspace") {
        currentIndex--
        if (currentIndex < 0) {
          currentIndex = 0
        }
        codeMap[currentIndex].status = "U"
        codeMap[currentIndex].status = "R"
        codeMap[currentIndex + 1].status = "U"
        setCodeMap([...codeMap])
        currentIndexRef.current = currentIndex
        return
      }

      else if (e.key === codeMap[currentIndex].character) {
        // Correct
        codeMap[currentIndex++].status = "C"
        codeMap[currentIndex] ? codeMap[currentIndex].status = "R" : null
        setCodeMap([...codeMap])
      } else {
        // Incorrect
        codeMap[currentIndex++].status = "I"
        codeMap[currentIndex] ? codeMap[currentIndex].status = "R" : null
        setCodeMap([...codeMap])
      }
    }
    else {
      setTimeout(() => {
        modelRef.current.classList.add("is-active")
        currentIndex = 0
        currentIndexRef.current = currentIndex
        textArea.current.value = ""
        var currentCode = code;
        setCode('// this is the hello world program in JavaScript\nconsole.log("Hello World");')
      }, 300);

    }
    currentIndexRef.current = currentIndex
  }

  return (
    <>
      <Navbar></Navbar>
      <div className="hero is-small">
        <br />
      </div>
      <div className="container" style={{ "minHeight": "60vh", "maxHeight": "70vh", "overflow": "scroll" }}>
        {
          codeMap.map((codeBlock, index) => {
            if (codeBlock.character === "\n") {
              if (codeBlock.status === "U") {
                return (<span key={index} ><span className={"button is-light"}> ENTER</span> <br /></span>)
              } else if (codeBlock.status === "C") {
                return (<span key={index} ><span className="button is-success"> ENTER</span> <br /></span>)
              } else if (codeBlock.status === "R") {
                return (<span key={index} ><span className="button is-warning"> ENTER</span> <br /></span>)
              }else {
                return (<span key={index} ><span className="button is-danger"> ENTER</span> <br /></span>)
              }
            }
            else if (codeBlock.character === "\t") {
              if (codeBlock.status === "U") {
                return (<span key={index} ><span className="button is-light"> T A B</span></span>)
              } else if (codeBlock.status === "C") {
                return (<span key={index} ><span className="button is-success"> T A B</span> </span>)
              } else if (codeBlock.status === "R") {
                return (<span key={index} ><span className="button is-warning"> T A B</span> </span>)
              } else {
                return (<span key={index} ><span className="button is-danger"> T A B</span> </span>)
              }
            }
            else {
              if (codeBlock.status === "U") {
                return (<span key={index} className='button is-white mx-1 codeblock' style={{ "textTransform": "none" }}>{codeBlock.character}</span>)
              } else if (codeBlock.status === "C") {
                return (<span key={index} className='button is-success is-light is-outlined codeblock mx-1' style={{ "textTransform": "none" }}>{codeBlock.character}</span>)
              } else if (codeBlock.status === "R") {
                return (<span key={index} className='button is-warning is-light is-outlined codeblock mx-1' style={{ "textTransform": "none" }}>{codeBlock.character}</span>)
              } else {
                return (<span key={index} className='button is-danger is-light is-outlined codeblock mx-1' style={{ "textTransform": "none" }}>{codeBlock.character}</span>)
              }

            }
          })
        }
      </div>
      <div className="section">
        <div className="container">
          <textarea name="" id="" autoComplete={"false"} placeholder='Start Typing Here...' autoFocus={true} ref={textArea} onKeyDown={handleCodeDown} className='input' style={{ height: "100px", "visibility": "visible", "userSelect": "none" }}></textarea>
        </div>
      </div>
      <div className="modal" ref={modelRef}>
        <div className="modal-background"></div>
        <div className="modal-content">
          <div className="box">
            <h1 className="title is-1 py-4">Test Completed!</h1>
            <h2 className="subtitle">
              <div className="buttons has-addons">
                <button className="button is-medium is-primary">
                  Retry 🔃
                </button>
                <button className="button is-medium is-success">
                  Next ⏭️
                </button>
              </div>
            </h2>
          </div>
        </div>
        <button className="modal-close is-large" aria-label="close" onClick={() => { modelRef.current.classList.remove("is-active") }} ref={modelCloseButtonRef}></button>
      </div>

    </>
  )
}

export default App

/*
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

*/