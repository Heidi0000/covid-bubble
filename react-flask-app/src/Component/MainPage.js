import { useState, useEffect } from "react"
import { ForceGraph2D } from 'react-force-graph'
const MainPage = () => {
    const test = {nodes:[{name: "Jane", email: "jane@"}, 
                            {name:"John", email: "john@"}],
                         links:[{source:"jane@",target:"john@"}]};
    const [data, setData] = useState({})
    useEffect(() => {
        fetch(`${process.env.REACT_APP_TEST}/mainpage/session`)
        .then(response => response.json())
        .then(data => console.log(data))
    }, [])
    const reloadData = () =>{
        
    }
    return (
        <div>
            <h1>Mainpage</h1>
            <button onClick={reloadData}>Reload</button>
            <ForceGraph2D graphData={test} nodeId = "email" />
        </div>
    )
}

export default MainPage
