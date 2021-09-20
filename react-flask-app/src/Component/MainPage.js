import { useState, useEffect } from "react"
import { ForceGraph2D } from 'react-force-graph'
const MainPage = () => {
    const test = {nodes:[{name: "Jane",id:"secret1"}, {name:"John", id:"secret2"}], links:[{source:"secret1",target:"secret2"}]};
    const [data, setData] = useState({})
    useEffect(() => {
        fetch(`${process.env.REACT_APP_TEST}/mainpage/session`)
        .then(response => response.json())
        .then(data => console.log(data))
    }, [])
    return (
        <div>
            <h1>Mainpage</h1>
            <ForceGraph2D graphData={test} nodeId = "id" />
        </div>
    )
}

export default MainPage
