import './App.css';
import { useEffect, useState } from "react"

function Component_2048() {

  const [cells, setCells] = useState({})
  const [over, setOver] = useState(false)
  const [mouse, setMouse] = useState([0, 0])
  
  useEffect(() => {
    if (!over) {
      const first = [Math.floor(Math.random() * 10) % 4, Math.floor(Math.random() * 10) % 4]
      const second = []
      while (second.length === 0 || (second[0] === first[0] && second[1] === first[1])) {
        second.length = 0
        second.push(Math.floor(Math.random() * 10) % 4)
        second.push(Math.floor(Math.random() * 10) % 4)
      }
      //console.log(first, second)
      for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 4; x++) {
          if (x === first[0] && y === first[1]) {
            cells[x + "_" + y] = 2
          } else if (x === second[0] && y === second[1]) {
            cells[x + "_" + y] = 2
          } else {
            cells[x + "_" + y] = 0
          }
        }
      }
      setCells({ ...cells })
      document.addEventListener('keydown', handleInput);
      document.addEventListener('touchstart', handleStart);
      document.addEventListener('touchend', handleEnd);
      return () => {
        document.removeEventListener('keydown', handleInput);
      }
    }
  }, [over])

  const handleStart = (e) => {
    console.log("start", e)
    const touch = e.changedTouches[0]
    console.log("mouse", [touch.pageX, touch.pageY])
    mouse[0] = touch.pageX
    mouse[1] = touch.pageY
    setMouse(...mouse)
  }

  const handleEnd = (e) => {
    console.log("end", e)
    const touch = e.changedTouches[0]
    const right = touch.pageX - mouse[0]
    const down = touch.pageY - mouse[1]
    console.log("mouse", mouse)
    //setMouse([touch.pageX, touch.pageY])
    handleTouch(right, down)
  }

  const handleTouch = (right, down) => {
    console.log("right:", right, "down:", down)
    if (over || (right === 0 && down === 0)) {
      return
    }
    if (Math.abs(right) > Math.abs(down) && right > 0) {
      console.log("right")
      for (let index = 0; index < 4; index++) {
        if (cells["3_" + index] !== 0 && cells["3_" + index] === cells["2_" + index]) { // 0 0 2 2
          cells["3_" + index] *= 2
          cells["2_" + index] = 0
        } else if (cells["3_" + index] !== 0 && cells["2_" + index] === 0 && cells["3_" + index] === cells["1_" + index]) { // 0 2 0 2
          cells["3_" + index] *= 2
          cells["1_" + index] = 0
        } else if (cells["3_" + index] !== 0 && cells["2_" + index] === 0 && cells["1_" + index] === 0 && cells["3_" + index] === cells["0_" + index]) { // 2 0 0 2
          cells["3_" + index] *= 2
          cells["0_" + index] = 0
        } else {
          if (cells["2_" + index] !== 0 && cells["2_" + index] === cells["1_" + index]) { // 0 2 2 0
            cells["2_" + index] *= 2
            cells["1_" + index] = 0
          } else if (cells["2_" + index] !== 0 && cells["1_" + index] === 0 && cells["2_" + index] === cells["0_" + index]) { // 2 0 2 0
            cells["2_" + index] *= 2
            cells["0_" + index] = 0
          } else {
            if (cells["1_" + index] !== 0 && cells["1_" + index] === cells["0_" + index]) { // 2 2 0 0
              cells["1_" + index] *= 2
              cells["0_" + index] = 0
            }
          }
        }
      }
      for (let y = 0; y < 4; y++) {
        for (let x = 3; x > 0; x--) {
          if (cells[x + "_" + y] === 0) {
            if (cells[(x - 1) + "_" + y] !== 0) {
              cells[x + "_" + y] = cells[(x - 1) + "_" + y]
              cells[(x - 1) + "_" + y] = 0
            } else if (x >= 2 && cells[(x - 2) + "_" + y] !== 0) {
              cells[x + "_" + y] = cells[(x - 2) + "_" + y]
              cells[(x - 2) + "_" + y] = 0
            } else if (x >= 3 && cells[(x - 3) + "_" + y] !== 0) {
              cells[x + "_" + y] = cells[(x - 3) + "_" + y]
              cells[(x - 3) + "_" + y] = 0
            }
          }
        }
      }
    } else if (Math.abs(down) > Math.abs(right) && down > 0) {
      console.log("down")
      for (let index = 0; index < 4; index++) {
        if (cells[index + "_3"] !== 0 && cells[index + "_3"] === cells[index + "_2"]) { // 0 0 2 2
          cells[index + "_3"] *= 2
          cells[index + "_2"] = 0
        } else if (cells[index + "_3"] !== 0 && cells[index + "_2"] === 0 && cells[index + "_3"] === cells[index + "_1"]) { // 0 2 0 2
          cells[index + "_3"] *= 2
          cells[index + "_1"] = 0
        } else if (cells[index + "_3"] !== 0 && cells[index + "_2"] === 0 && cells[index + "_1"] === 0 && cells[index + "_3"] === cells[index + "_0"]) { // 2 0 0 2
          cells[index + "_3"] *= 2
          cells[index + "_0"] = 0
        } else {
          if (cells[index + "_2"] !== 0 && cells[index + "_2"] === cells[index + "_1"]) { // 0 2 2 0
            cells[index + "_2"] *= 2
            cells[index + "_1"] = 0
          } else if (cells[index + "_2"] !== 0 && cells[index + "_1"] === 0 && cells[index + "_2"] === cells[index + "_0"]) { // 2 0 2 0
            cells[index + "_2"] *= 2
            cells[index + "_0"] = 0
          } else {
            if (cells[index + "_1"] !== 0 && cells[index + "_1"] === cells[index + "_0"]) { // 2 2 0 0
              cells[index + "_1"] *= 2
              cells[index + "_0"] = 0
            }
          }
        }
      }
      for (let x = 0; x < 4; x++) {
        for (let y = 3; y > 0; y--) {
          if (cells[x + "_" + y] === 0) {
            if (cells[x + "_" + (y - 1)] !== 0) {
              cells[x + "_" + y] = cells[x + "_" + (y - 1)]
              cells[x + "_" + (y - 1)] = 0
            } else if (y >= 2 && cells[x + "_" + (y - 2)] !== 0) {
              cells[x + "_" + y] = cells[x + "_" + (y - 2)]
              cells[x + "_" + (y - 2)] = 0
            } else if (y >= 3 && cells[x + "_" + (y - 3)] !== 0) {
              cells[x + "_" + y] = cells[x + "_" + (y - 3)]
              cells[x + "_" + (y - 3)] = 0
            }
          }
        }
      }
    } else if (Math.abs(right) > Math.abs(down) && right < 0) {
      console.log("left")
      for (let index = 0; index < 4; index++) {
        if (cells["0_" + index] !== 0 && cells["0_" + index] === cells["1_" + index]) { // 0 0 2 2
          cells["0_" + index] *= 2
          cells["1_" + index] = 0
        } else if (cells["0_" + index] !== 0 && cells["1_" + index] === 0 && cells["0_" + index] === cells["2_" + index]) { // 0 2 0 2
          cells["0_" + index] *= 2
          cells["2_" + index] = 0
        } else if (cells["0_" + index] !== 0 && cells["1_" + index] === 0 && cells["2_" + index] === 0 && cells["0_" + index] === cells["3_" + index]) { // 2 0 0 2
          cells["0_" + index] *= 2
          cells["3_" + index] = 0
        } else {
          if (cells["1_" + index] !== 0 && cells["1_" + index] === cells["2_" + index]) { // 0 2 2 0
            cells["1_" + index] *= 2
            cells["2_" + index] = 0
          } else if (cells["1_" + index] !== 0 && cells["2_" + index] === 0 && cells["1_" + index] === cells["3_" + index]) { // 2 0 2 0
            cells["1_" + index] *= 2
            cells["3_" + index] = 0
          } else {
            if (cells["2_" + index] !== 0 && cells["2_" + index] === cells["3_" + index]) { // 2 2 0 0
              cells["2_" + index] *= 2
              cells["3_" + index] = 0
            }
          }
        }
      }
      for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 3; x++) {
          if (cells[x + "_" + y] === 0) {
            if (cells[(x + 1) + "_" + y] !== 0) {
              cells[x + "_" + y] = cells[(x + 1) + "_" + y]
              cells[(x + 1) + "_" + y] = 0
            } else if (x < 2 && cells[(x + 2) + "_" + y] !== 0) {
              cells[x + "_" + y] = cells[(x + 2) + "_" + y]
              cells[(x + 2) + "_" + y] = 0
            } else if (x < 1 && cells[(x + 3) + "_" + y] !== 0) {
              cells[x + "_" + y] = cells[(x + 3) + "_" + y]
              cells[(x + 3) + "_" + y] = 0
            }
          }
        }
      }
    } else if (Math.abs(down) > Math.abs(right) && down < 0) {
      console.log("up")
      for (let index = 0; index < 4; index++) {
        if (cells[index + "_0"] !== 0 && cells[index + "_0"] === cells[index + "_1"]) { // 0 0 2 2
          cells[index + "_0"] *= 2
          cells[index + "_1"] = 0
        } else if (cells[index + "_0"] !== 0 && cells[index + "_1"] === 0 && cells[index + "_0"] === cells[index + "_2"]) { // 0 2 0 2
          cells[index + "_0"] *= 2
          cells[index + "_2"] = 0
        } else if (cells[index + "_0"] !== 0 && cells[index + "_1"] === 0 && cells[index + "_2"] === 0 && cells[index + "_0"] === cells[index + "_3"]) { // 2 0 0 2
          cells[index + "_0"] *= 2
          cells[index + "_3"] = 0
        } else {
          if (cells[index + "_1"] !== 0 && cells[index + "_1"] === cells[index + "_2"]) { // 0 2 2 0
            cells[index + "_1"] *= 2
            cells[index + "_2"] = 0
          } else if (cells[index + "_1"] !== 0 && cells[index + "_2"] === 0 && cells[index + "_1"] === cells[index + "_3"]) { // 2 0 2 0
            cells[index + "_1"] *= 2
            cells[index + "_3"] = 0
          } else {
            if (cells[index + "_2"] !== 0 && cells[index + "_2"] === cells[index + "_3"]) { // 2 2 0 0
              cells[index + "_2"] *= 2
              cells[index + "_3"] = 0
            }
          }
        }
      }
      for (let x = 0; x < 4; x++) {
        for (let y = 0; y < 3; y++) {
          if (cells[x + "_" + y] === 0) {
            if (cells[x + "_" + (y + 1)] !== 0) {
              cells[x + "_" + y] = cells[x + "_" + (y + 1)]
              cells[x + "_" + (y + 1)] = 0
            } else if (y < 2 && cells[x + "_" + (y + 2)] !== 0) {
              cells[x + "_" + y] = cells[x + "_" + (y + 2)]
              cells[x + "_" + (y + 2)] = 0
            } else if (y < 1 && cells[x + "_" + (y + 3)] !== 0) {
              cells[x + "_" + y] = cells[x + "_" + (y + 3)]
              cells[x + "_" + (y + 3)] = 0
            }
          }
        }
      }
    }
    const arrayVersion = Object.entries(cells) // [[0_0, 2], [0_1, 0],...]
    const zeroes = arrayVersion.filter((pair) => {return pair[1] === 0}) // [[0_1, 0]...]
    if (zeroes.length === 0) {
      setOver(true)
    } else {
      const chosenOne = zeroes[Math.floor(Math.random() * zeroes.length)] // 0.33 * 12 = 3.96 -> 3
      cells[chosenOne[0]] = 2
    }
    //console.log(cells)
    setCells({ ...cells })
  }

  const handleInput = (e) => {
    if (over || (e.keyCode !== 39 && e.keyCode !== 40 && e.keyCode !== 37 && e.keyCode !== 38)) {
      return
    }
    if (e.keyCode === 39) {
      console.log("right")
      for (let index = 0; index < 4; index++) {
        if (cells["3_" + index] !== 0 && cells["3_" + index] === cells["2_" + index]) { // 0 0 2 2
          cells["3_" + index] *= 2
          cells["2_" + index] = 0
        } else if (cells["3_" + index] !== 0 && cells["2_" + index] === 0 && cells["3_" + index] === cells["1_" + index]) { // 0 2 0 2
          cells["3_" + index] *= 2
          cells["1_" + index] = 0
        } else if (cells["3_" + index] !== 0 && cells["2_" + index] === 0 && cells["1_" + index] === 0 && cells["3_" + index] === cells["0_" + index]) { // 2 0 0 2
          cells["3_" + index] *= 2
          cells["0_" + index] = 0
        } else {
          if (cells["2_" + index] !== 0 && cells["2_" + index] === cells["1_" + index]) { // 0 2 2 0
            cells["2_" + index] *= 2
            cells["1_" + index] = 0
          } else if (cells["2_" + index] !== 0 && cells["1_" + index] === 0 && cells["2_" + index] === cells["0_" + index]) { // 2 0 2 0
            cells["2_" + index] *= 2
            cells["0_" + index] = 0
          } else {
            if (cells["1_" + index] !== 0 && cells["1_" + index] === cells["0_" + index]) { // 2 2 0 0
              cells["1_" + index] *= 2
              cells["0_" + index] = 0
            }
          }
        }
      }
      for (let y = 0; y < 4; y++) {
        for (let x = 3; x > 0; x--) {
          if (cells[x + "_" + y] === 0) {
            if (cells[(x - 1) + "_" + y] !== 0) {
              cells[x + "_" + y] = cells[(x - 1) + "_" + y]
              cells[(x - 1) + "_" + y] = 0
            } else if (x >= 2 && cells[(x - 2) + "_" + y] !== 0) {
              cells[x + "_" + y] = cells[(x - 2) + "_" + y]
              cells[(x - 2) + "_" + y] = 0
            } else if (x >= 3 && cells[(x - 3) + "_" + y] !== 0) {
              cells[x + "_" + y] = cells[(x - 3) + "_" + y]
              cells[(x - 3) + "_" + y] = 0
            }
          }
        }
      }
    } else if (e.keyCode === 40) {
      console.log("down")
      for (let index = 0; index < 4; index++) {
        if (cells[index + "_3"] !== 0 && cells[index + "_3"] === cells[index + "_2"]) { // 0 0 2 2
          cells[index + "_3"] *= 2
          cells[index + "_2"] = 0
        } else if (cells[index + "_3"] !== 0 && cells[index + "_2"] === 0 && cells[index + "_3"] === cells[index + "_1"]) { // 0 2 0 2
          cells[index + "_3"] *= 2
          cells[index + "_1"] = 0
        } else if (cells[index + "_3"] !== 0 && cells[index + "_2"] === 0 && cells[index + "_1"] === 0 && cells[index + "_3"] === cells[index + "_0"]) { // 2 0 0 2
          cells[index + "_3"] *= 2
          cells[index + "_0"] = 0
        } else {
          if (cells[index + "_2"] !== 0 && cells[index + "_2"] === cells[index + "_1"]) { // 0 2 2 0
            cells[index + "_2"] *= 2
            cells[index + "_1"] = 0
          } else if (cells[index + "_2"] !== 0 && cells[index + "_1"] === 0 && cells[index + "_2"] === cells[index + "_0"]) { // 2 0 2 0
            cells[index + "_2"] *= 2
            cells[index + "_0"] = 0
          } else {
            if (cells[index + "_1"] !== 0 && cells[index + "_1"] === cells[index + "_0"]) { // 2 2 0 0
              cells[index + "_1"] *= 2
              cells[index + "_0"] = 0
            }
          }
        }
      }
      for (let x = 0; x < 4; x++) {
        for (let y = 3; y > 0; y--) {
          if (cells[x + "_" + y] === 0) {
            if (cells[x + "_" + (y - 1)] !== 0) {
              cells[x + "_" + y] = cells[x + "_" + (y - 1)]
              cells[x + "_" + (y - 1)] = 0
            } else if (y >= 2 && cells[x + "_" + (y - 2)] !== 0) {
              cells[x + "_" + y] = cells[x + "_" + (y - 2)]
              cells[x + "_" + (y - 2)] = 0
            } else if (y >= 3 && cells[x + "_" + (y - 3)] !== 0) {
              cells[x + "_" + y] = cells[x + "_" + (y - 3)]
              cells[x + "_" + (y - 3)] = 0
            }
          }
        }
      }
    } else if (e.keyCode === 37) {
      console.log("left")
      for (let index = 0; index < 4; index++) {
        if (cells["0_" + index] !== 0 && cells["0_" + index] === cells["1_" + index]) { // 0 0 2 2
          cells["0_" + index] *= 2
          cells["1_" + index] = 0
        } else if (cells["0_" + index] !== 0 && cells["1_" + index] === 0 && cells["0_" + index] === cells["2_" + index]) { // 0 2 0 2
          cells["0_" + index] *= 2
          cells["2_" + index] = 0
        } else if (cells["0_" + index] !== 0 && cells["1_" + index] === 0 && cells["2_" + index] === 0 && cells["0_" + index] === cells["3_" + index]) { // 2 0 0 2
          cells["0_" + index] *= 2
          cells["3_" + index] = 0
        } else {
          if (cells["1_" + index] !== 0 && cells["1_" + index] === cells["2_" + index]) { // 0 2 2 0
            cells["1_" + index] *= 2
            cells["2_" + index] = 0
          } else if (cells["1_" + index] !== 0 && cells["2_" + index] === 0 && cells["1_" + index] === cells["3_" + index]) { // 2 0 2 0
            cells["1_" + index] *= 2
            cells["3_" + index] = 0
          } else {
            if (cells["2_" + index] !== 0 && cells["2_" + index] === cells["3_" + index]) { // 2 2 0 0
              cells["2_" + index] *= 2
              cells["3_" + index] = 0
            }
          }
        }
      }
      for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 3; x++) {
          if (cells[x + "_" + y] === 0) {
            if (cells[(x + 1) + "_" + y] !== 0) {
              cells[x + "_" + y] = cells[(x + 1) + "_" + y]
              cells[(x + 1) + "_" + y] = 0
            } else if (x < 2 && cells[(x + 2) + "_" + y] !== 0) {
              cells[x + "_" + y] = cells[(x + 2) + "_" + y]
              cells[(x + 2) + "_" + y] = 0
            } else if (x < 1 && cells[(x + 3) + "_" + y] !== 0) {
              cells[x + "_" + y] = cells[(x + 3) + "_" + y]
              cells[(x + 3) + "_" + y] = 0
            }
          }
        }
      }
    } else if (e.keyCode === 38) {
      console.log("up")
      for (let index = 0; index < 4; index++) {
        if (cells[index + "_0"] !== 0 && cells[index + "_0"] === cells[index + "_1"]) { // 0 0 2 2
          cells[index + "_0"] *= 2
          cells[index + "_1"] = 0
        } else if (cells[index + "_0"] !== 0 && cells[index + "_1"] === 0 && cells[index + "_0"] === cells[index + "_2"]) { // 0 2 0 2
          cells[index + "_0"] *= 2
          cells[index + "_2"] = 0
        } else if (cells[index + "_0"] !== 0 && cells[index + "_1"] === 0 && cells[index + "_2"] === 0 && cells[index + "_0"] === cells[index + "_3"]) { // 2 0 0 2
          cells[index + "_0"] *= 2
          cells[index + "_3"] = 0
        } else {
          if (cells[index + "_1"] !== 0 && cells[index + "_1"] === cells[index + "_2"]) { // 0 2 2 0
            cells[index + "_1"] *= 2
            cells[index + "_2"] = 0
          } else if (cells[index + "_1"] !== 0 && cells[index + "_2"] === 0 && cells[index + "_1"] === cells[index + "_3"]) { // 2 0 2 0
            cells[index + "_1"] *= 2
            cells[index + "_3"] = 0
          } else {
            if (cells[index + "_2"] !== 0 && cells[index + "_2"] === cells[index + "_3"]) { // 2 2 0 0
              cells[index + "_2"] *= 2
              cells[index + "_3"] = 0
            }
          }
        }
      }
      for (let x = 0; x < 4; x++) {
        for (let y = 0; y < 3; y++) {
          if (cells[x + "_" + y] === 0) {
            if (cells[x + "_" + (y + 1)] !== 0) {
              cells[x + "_" + y] = cells[x + "_" + (y + 1)]
              cells[x + "_" + (y + 1)] = 0
            } else if (y < 2 && cells[x + "_" + (y + 2)] !== 0) {
              cells[x + "_" + y] = cells[x + "_" + (y + 2)]
              cells[x + "_" + (y + 2)] = 0
            } else if (y < 1 && cells[x + "_" + (y + 3)] !== 0) {
              cells[x + "_" + y] = cells[x + "_" + (y + 3)]
              cells[x + "_" + (y + 3)] = 0
            }
          }
        }
      }
    }
    const arrayVersion = Object.entries(cells) // [[0_0, 2], [0_1, 0],...]
    const zeroes = arrayVersion.filter((pair) => {return pair[1] === 0}) // [[0_1, 0]...]
    if (zeroes.length === 0) {
      setOver(true)
    } else {
      const chosenOne = zeroes[Math.floor(Math.random() * zeroes.length)] // 0.33 * 12 = 3.96 -> 3
      cells[chosenOne[0]] = 2
    }
    //console.log(cells)
    setCells({ ...cells })
  }

  const gameOver = () => {
    setOver(false)
  }

  return (
    <div style={{backgroundColor:"#282c34", display:"flex", color:"white", textAlign:"center", justifyContent:"center", alignItems:"center", width:"100%", height:"100vh", flexDirection:"column"}}>
      {over && <div style={{position:"fixed", minWidth:"100vw", minHeight:"100vh", backgroundColor:"rgba(0,0,0,0.5)", display:"flex", justifyContent:"center", alignItems:"center", color:"white", fontSize:"30px", fontWeight:"bold", flexDirection:"column"}}>
        <div>Game Over</div>
        <div style={{fontSize:"20px", backgroundColor:"pink", border:"3px solid gray", padding:"4px 8px"}} onClick={() => {gameOver()}}>Restart</div>
      </div>}
      <div style={{paddingBottom:"16px", fontSize:"30px", fontWeight:"bold"}}>2048Plus</div>
      <header style={{display:"flex", flexDirection:"row", justifyContent:"flex-start", alignItems:"center", alignContent:"flex-start", flexWrap:"wrap", maxWidth:"300px", maxHeight:"300px"}}>
        {Object.keys(cells).map((key, index) => { return (
          <div key={index} style={{minWidth:"75px", minHeight:"75px", backgroundColor:"pink", display:"flex", justifyContent:"center", alignItems:"center", fontSize:cells[key] < 1000 ? "32px" : "16px", fontWeight:"bold", boxSizing:"border-box", border:"3px solid gray"}}>{cells[key] === 0 ? "" : cells[key]}</div>
        )})}
      </header>
      <div style={{paddingTop:"16px"}}>Use arrow keys (or touch and slide if on mobile), to play the game...</div>
    </div>
  )
}

export default Component_2048;
