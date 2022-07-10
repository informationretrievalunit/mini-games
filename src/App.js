import './App.css';
import { useEffect, useState } from "react"
import Component_2048 from "./Component_2048"
import Component_Minesweeper from "./Component_Minesweeper"

function App() {

  const [section, setSection] = useState("")

  const runSection = (e) => {
    console.log(e.target.innerText)
    setSection(e.target.innerText)
  }

  if (section === "2048") {
    return (
      <Component_2048 />
    )
  } else if (section === "Minesweeper") {
    return (
      <Component_Minesweeper />
    )
  } else {
    return (
      <div style={{display:"flex", flexDirection:"column", justifyContent:"flex-start", alignItems:"center", backgroundColor:"#282c34", height:"100vh", width:"100%", color:"white", padding:"32px 0px", boxSizing:"border-box"}}>
        <div style={{fontWeight:"bold"}}>What game would you like to play?</div>
        <ul style={{marginRight:"auto"}}>
          <li onClick={(e) => {runSection(e)}}>Minesweeper</li>
          <li onClick={(e) => {runSection(e)}}>2048</li>
        </ul>
      </div>
    )
  }
}

export default App;
