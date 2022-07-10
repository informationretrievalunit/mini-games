import './App.css';
import { useEffect, useState } from "react"

function Component_Minesweeper() {

  const [isGameOver, setIsGameOver] = useState(false)
  const [trigger, setTrigger] = useState(true)
  const [size, setSize] = useState(9)
  const [frequency, setFrequency] = useState(0.123)
  const [mines, setMines] = useState({})
  const [cells, setCells] = useState({})

  useEffect(() => {
    if (trigger) {
      for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
          let random = Math.random()
          if (random < frequency) {
            mines[x + " " + y] = true
          } else {
            mines[x + " " + y] = false
          }
          setMines({...mines})
          cells[x + " " + y] = null
          setCells({...cells})
        }
      }
      setTrigger(false)
      setIsGameOver(false)
      console.log("reset")
    }
  }, [trigger])

  const dig = (key) => {
    if (cells[key] === null) {
      if (mines[key]) {
        if (!isGameOver) {
          setIsGameOver(true)
        } else {
          cells[key] = "!"
          setCells({...cells})
        }
        return
      }
      const coords = key.split(" ")
      const x = coords[0]
      const y = coords[1]
      const empty = []
      let surrounding = 0
      if (mines[(parseInt(x) - 1) + " " + y]) {
        surrounding += 1
      } else {
        empty.push((parseInt(x) - 1) + " " + y)
      }
      if (mines[(parseInt(x) + 1) + " " + y]) {
        surrounding += 1
      } else {
        empty.push((parseInt(x) + 1) + " " + y)
      }
      if (mines[x + " " + (parseInt(y) - 1)]) {
        surrounding += 1
      } else {
        empty.push(x + " " + (parseInt(y) - 1))
      }
      if (mines[x + " " + (parseInt(y) + 1)]) {
        surrounding += 1
      } else {
        empty.push(x + " " + (parseInt(y) + 1))
      }
      if (mines[(parseInt(x) - 1) + " " + (parseInt(y) - 1)]) {
        surrounding += 1
      } else {
        empty.push((parseInt(x) - 1) + " " + (parseInt(y) - 1))
      }
      if (mines[(parseInt(x) - 1) + " " + (parseInt(y) + 1)]) {
        surrounding += 1
      } else {
        empty.push((parseInt(x) - 1) + " " + (parseInt(y) + 1))
      }
      if (mines[(parseInt(x) + 1) + " " + (parseInt(y) - 1)]) {
        surrounding += 1
      } else {
        empty.push((parseInt(x) + 1) + " " + (parseInt(y) - 1))
      }
      if (mines[(parseInt(x) + 1) + " " + (parseInt(y) + 1)]) {
        surrounding += 1
      } else {
        empty.push((parseInt(x) + 1) + " " + (parseInt(y) + 1))
      }
      cells[key] = surrounding
      setCells({...cells})
      if (surrounding === 0) {
        for (let index = 0; index < empty.length; index++) {
          const element = empty[index];
          dig(element)
        }
      }
    }
  }

  useEffect(() => {
    if (isGameOver) {
      for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
          dig(x + " " + y)
        }
      }
    }
  }, [isGameOver])

  return (
    <div style={{backgroundColor:"#282c34", display:"flex", color:"white", textAlign:"center", justifyContent:"center", alignItems:"center", width:"100%", height:"100vh", flexDirection:"column"}}>
      <div style={{minWidth:"100%", minHeight:"100vh", color:"white", fontWeight:"bold", paddingTop:"16px", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", textAlign:"center"}}>
        <div style={{fontSize:"30px", fontWeight:"bold"}}>Minesweeper</div>
        <div style={{margin:"16px 0px", display:"flex", flexDirection:"row", justifyContent:"center", alignContent:"center", alignItems:"center", flexWrap:"wrap", marginLeft:"auto", marginRight:"auto", minWidth:"320px", maxWidth:"320px", minHeight:"320px", maxHeight:"320px"}}>
          {Object.keys(cells).map((key, index) => { return (
            <div key={index} onClick={() => {!isGameOver && dig(key)}} style={{backgroundColor:"yellowgreen", minWidth:320/size+"px", minHeight:320/size+"px", display:"flex", justifyContent:"center", alignItems:"center", border:"1px solid white", boxSizing:"border-box"}}>
              {(cells[key] === null) ? "" : cells[key]}
            </div>
          )})}
        </div>
        <div onClick={() => {setTrigger(true)}}>restart</div>
      </div>
    </div>
  );
}

export default Component_Minesweeper;
