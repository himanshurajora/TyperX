import { useEffect, useRef, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import app from './init'
import Navbar from '../components/Navbar/Navbar'
import Data from './data.json'
import KeySound1 from './key1.mp3'
import KeySound2 from './key2.mp3'
import { useParams } from 'react-router-dom'
declare interface CodeBlock {
  character: string
  // Here C = yes the chracter has been attempted and correct # Currect
  // Here I  the caracter has been attempted but is wrongly typed # Incorrect
  // U = The character has no been attempted yet # Unattempted
  // R = THe charater that has to be written right now or the current index # current index
  status: "C" | "I" | "U" | "R"
}
declare type Paths = "Basic" | "DataStructures" | "Algorithms"
const PossiblePaths: Paths[] = ["Basic", "DataStructures", "Algorithms"]
function App() {
  const initText = "Hello There!\nWelcome to TyperX, Learn By Typing\nYou Can Either Select A Perticular Programming Language And A Program Or You Can Start Typing This Paragraph As Well"
  const [time, setTime] = useState(0);
  var timerStart = useRef(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [code, setCode] = useState(initText)
  const [codeMap, setCodeMap] = useState<CodeBlock[]>([])
  const [codeText, setCodeText] = useState("")
  const [languages, setLanguages] = useState<string[]>([])
  const [programs, setPrograms] = useState<string[]>([])
  const [currentLanguage, setCurrentLanguage] = useState("JavaScript")
  const [currentProgram, setCurrentProgram] = useState("")
  const [description, setDescription] = useState("")
  var currentIndexRef = useRef(0)
  var totalWords = useRef(0)
  var modelRef = useRef<any>()
  var modelCloseButtonRef = useRef<any>()
  var textArea = useRef<any>()

  // Router
  var { path } = useParams()
  var [currentPath, setCurrentPath] = useState<Paths>(path as any)
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
    if (path) {
      if (PossiblePaths.includes(path as Paths)) {
        setCurrentPath(path as Paths)
      }else{
        setCurrentPath("Basic")
      }
    }else{
      setCurrentPath("Basic")
    }
  }, [])

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
    setPrograms(Data[currentPath]['programlist'])
    // document.addEventListener("mousedown", playMouseSound)
  }, [path])

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
  const setInit = () => {
    currentIndexRef.current = 0
    if (currentLanguage && currentProgram) {
      // fetch("/src/data.json").then((res) => {
      //   res.json().then((data) => {
      //     setCode(data[currentLanguage][currentProgram]['code'])
      //     setDescription(data[currentLanguage][currentProgram]['description'])
      //   })
      // })
      setCode((Data as any)['Programs'][currentPath][currentLanguage][currentProgram]['code'])
      setDescription((Data as any)['Programs'][currentPath][currentLanguage][currentProgram]['description'])
    }
    textArea.current.focus()
  }

  const handleCodeDown = (e: any) => {
    let currentIndex = currentIndexRef.current

    if (ignoredKeys.includes(e.key)) {
      return
    }
    if (currentIndex < codeMap.length - 1) {
      playSound()
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
      if (e.key) {
        playSound()
        if (e.key === codeMap[currentIndex].character) {
          codeMap[currentIndex].status = "C"
        } else {
          codeMap[currentIndex].status = "I"
        }
        modelRef.current.classList.add("is-active")
      }
    }

    currentIndexRef.current = currentIndex
  }

  const handleReset = () => {
    modelCloseButtonRef.current.click();
    currentIndexRef.current = 0
    setCodeText(' ')
    codeMap.forEach(codeBlock => { codeBlock.status = 'U' })
    codeMap[0].status = 'R'
    setInit()
  }

  const playSound = () => {
    // set audio position to 0    
    try {
      audioRef.current!.pause()
      audioRef.current!.currentTime = 0
      audioRef.current!.play()
    } catch (e) { }
  }

  // const playMouseSound = () => {
  //   audioRef.current!.src = KeySound1
  //   audioRef.current!.pause()
  //   audioRef.current!.currentTime = 0
  //   audioRef.current!.play()
  // }

  const loadNextProgram = () => {
    setCurrentProgram(Data[currentPath]["programlist"][Data[currentPath]["programlist"].indexOf(currentProgram) + 1 === Data[currentPath]["programlist"].length ? 0 : Data[currentPath]["programlist"].indexOf(currentProgram) + 1]); modelCloseButtonRef.current.click()
  }

  return (
    <>
      <Navbar></Navbar>
      <div className="hero is-small">
        <br />
        <div className="container">
          <div className="columns is-vcentered is-multiline">
            <div className="column">
              <div className='title is-5'>{time + "s"}</div>
            </div>
            <div className="column">
              <div className="control has-icons-left">
                <div className="select">
                  <select value={currentLanguage} onChange={(e) => { setCurrentLanguage(e.target.value) }}>
                    <option value={"JavaScript"}>Default JavaScript</option>
                    {/* {
                      languages.map((language, index) => {
                        return <option key={index}>{language}</option>
                      })
                    } */}
                  </select>
                </div>
                <div className="icon is-small is-left">
                  <p>⌨️</p>
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
              return <span key={index} className={`subtitle is-5 ${codeBlock.status == "C" ? "has-background-success has-text-light" : codeBlock.status == "I" ? "has-background-danger has-text-light" : codeBlock.status == "R" ? "current has-background-warning has-text-white" : "has-background-white has-text-black"}`}>&nbsp;&nbsp;&nbsp;</span>
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
                <button className="button is-medium is-primary" onClick={() => { handleReset(); }}>
                  Retry 🔃
                </button>
                <button className="button is-medium is-success" onClick={loadNextProgram}>
                  Next ⏭️
                </button>
              </div>
            </h2>
          </div>
        </div>
        <button className="modal-close is-large" aria-label="close" onClick={() => { modelRef.current.classList.remove("is-active") }} ref={modelCloseButtonRef}></button>
      </div>
      <audio controls={false} src={KeySound2} ref={audioRef}></audio>
    </>
  )
}

export default App