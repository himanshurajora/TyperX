import { useEffect, useRef, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import app from './init'
import Navbar from '../components/Navbar/Navbar'
import Data from './data.json'
declare interface CodeBlock {
  character: string
  // Here C = yes the chracter has been attempted and correct # Currect
  // Here I  the caracter has been attempted but is wrongly typed # Incorrect
  // U = The character has no been attempted yet # Unattempted
  // R = THe charater that has to be written right now or the current index # current index
  status: "C" | "I" | "U" | "R"
}
function App() {
  const initText = "Hello There!\nWelcome to TyperX, Learn By Typing\nYou Can Either Select A Perticular Programming Language And A Program Or You Can Start Typing This Paragraph As Well"
  const [code, setCode] = useState(initText)
  const [codeMap, setCodeMap] = useState<CodeBlock[]>([])
  const [codeText, setCodeText] = useState("")
  const [languages, setLanguages] = useState<string[]>([])
  const [programs, setPrograms] = useState<string[]>([])
  const [currentLanguage, setCurrentLanguage] = useState("")
  const [currentProgram, setCurrentProgram] = useState("")
  const [description, setDescription] = useState("")
  var currentIndexRef = useRef(0)
  var totalWords = useRef(0)
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

  // use effect of first load
  useEffect(() => {
    // with api
    // fetch("/src/data.json").then((res) => {
    //   res.json().then((data) => {
    //     setLanguages(data['languages'])
    //     setPrograms(data['programlist'])
    //   })
    // })
    // without api
    setLanguages(Data['languages'])
    setPrograms(Data['programlist'])
  }, [])

  // use effect whever the code string changes
  useEffect(() => {
    // Make the code map from code string 
    let tempCodeMap: CodeBlock[] = []
    code.split("").forEach((char) => {
      // current code block 
      var codeBlock: CodeBlock = {
        character: char,
        status: "U",
      }

      tempCodeMap.push(codeBlock)
    })
    totalWords.current = code.split(/ |\n/).length
    tempCodeMap[0].status = "R"
    setCodeMap(tempCodeMap)

  }, [code])

  // use effect when the current language or the current program changes
  useEffect(() => {
    setCodeText('')
    setInit()
  }, [currentLanguage, currentProgram])


  // set the code and codeBlocks
  const setInit = ()=>{
    if (currentLanguage && currentProgram) {
      // fetch("/src/data.json").then((res) => {
      //   res.json().then((data) => {
      //     setCode(data[currentLanguage][currentProgram]['code'])
      //     setDescription(data[currentLanguage][currentProgram]['description'])
      //   })
      // })
      // console.log(Data)
      setCode((Data as any)[currentLanguage][currentProgram]['code'])
      setDescription((Data as any)[currentLanguage][currentProgram]['description'])
    }
    textArea.current.focus()
  }

  const handleCodeDown = (e: any) => {
    let currentIndex = currentIndexRef.current

    if (ignoredKeys.includes(e.key)) {
      return
    }
    if (currentIndex < codeMap.length - 1) {
      if (e.key === "Tab") {
        e.preventDefault()
        if (codeMap[currentIndex].character === "\t") {
          codeMap[currentIndex++].status = "C"
          codeMap[currentIndex].status = "R"
        }
        setCodeText(codeText + "        ")
      } else if (e.key === "Backspace") {
        currentIndex--
        if (currentIndex < 0) {
          currentIndex = 0
        }
        codeMap[currentIndex + 1].status = "U"
        codeMap[currentIndex].status = "R"

        setCodeMap([...codeMap])
      }
      else if (e.key === codeMap[currentIndex].character) {
        codeMap[currentIndex++].status = "C"
        codeMap[currentIndex].status = "R"
        setCodeMap([...codeMap])
      } else {
        codeMap[currentIndex++].status = "I"
        codeMap[currentIndex].status = "R"
        setCodeMap([...codeMap])

      }
    } else {
      if (e.key === codeMap[currentIndex].character) {
        codeMap[currentIndex].status = "C"
      } else {
        codeMap[currentIndex].status = "I"
      }
    }

    currentIndexRef.current = currentIndex
  }

  const handleReset = () => {
    currentIndexRef.current = 0
    setCode(' ')
    setCodeText(' ')
    setInit()
  }

  return (
    <>
      <Navbar></Navbar>
      <div className="hero is-small">
        <br />
        <div className="container">
          <div className="columns">
            <div className="column">
              <div className="control has-icons-left">
                <div className="select">
                  <select value={currentLanguage} onChange={(e) => { setCurrentLanguage(e.target.value) }}>
                    <option value={""}>Select Language</option>
                    {
                      languages.map((language, index) => {
                        return <option key={index}>{language}</option>
                      })
                    }
                  </select>
                </div>
                <div className="icon is-small is-left">
                  <p>🖥️</p>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="control has-icons-left">
                <div className="select">
                  <select value={currentProgram} onChange={(e) => { setCurrentProgram(e.target.value) }}>
                    <option value={""}>Select Program</option>
                    {
                      programs.map((program, index) => {
                        return <option key={index}>{program}</option>
                      })
                    }
                  </select>
                </div>
                <div className="icon is-small is-left">
                  <p>🖥️</p>
                </div>
              </div>
            </div>
            <div className="column">
              <button className='button is-danger' onClick={handleReset}>Reset</button>
            </div>
          </div>

        </div>
      </div>
      <br />
      <div className="container notification" style={{ "minHeight": "50vh", "maxHeight": "50vh", "overflow": "scroll" }}>
        {
          codeMap.map((codeBlock, index) => {
            if (codeBlock.character === "\n") {
              return <span key={index} className={`subtitle is-5 ${codeBlock.status == "C" ? "has-background-success has-text-light" : codeBlock.status == "I" ? "has-background-danger has-text-light" : codeBlock.status == "R" ? "current has-background-warning has-text-white" : "has-background-white has-text-black"}`}>  <br /> </span>
            } else if (codeBlock.character === " ") {
              return <span key={index} className={`subtitle is-5 ${codeBlock.status == "C" ? "has-background-success has-text-light" : codeBlock.status == "I" ? "has-background-danger has-text-light" : codeBlock.status == "R" ? "current has-background-warning has-text-white" : "has-background-white has-text-black"}`}>&nbsp;</span>
            } else if (codeBlock.character === "\t") {
              return <span key={index} className={`subtitle is-5 ${codeBlock.status == "C" ? "has-background-success has-text-light" : codeBlock.status == "I" ? "has-background-danger has-text-light" : codeBlock.status == "R" ? "current has-background-warning has-text-white" : "has-background-white has-text-black"}`}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            } else {
              return <span key={index} className={`subtitle is-5 ${codeBlock.status == "C" ? "has-background-success has-text-light" : codeBlock.status == "I" ? "has-background-danger has-text-light" : codeBlock.status == "R" ? "current has-background-warning has-text-white" : "has-background-white has-text-black"}`}>{codeBlock.character}</span>

            }

          })
        }

      </div>
      <div className="section">
        <div className="container">
          <textarea name="" id="" value={codeText} onChange={(e) => { setCodeText(e.target.value) }} autoComplete={"false"} placeholder='Start Typing Here...' autoFocus={true} ref={textArea} onKeyDown={handleCodeDown} className='input' style={{ height: "150px", "visibility": "visible", "userSelect": "none" }}></textarea>
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