import { useState, useEffect } from "react"
import { ForceGraph2D } from 'react-force-graph'
const MainPage = () => {
    const [nodes_, setNodes] = useState([])
    const [links_,setLinks] = useState([])
    const [name, setName] = useState([])
    const [recieved, setRecieved] = useState(false)
    const handleNodeClick = (node) => {
        console.log("forcegraph click on ",node)
    }

    useEffect(() => {
        fetch(`${process.env.REACT_APP_TEST}/mainpage/session`)
        .then(response => response.json())
        .then(data => {
            setName(data.user)
            setNodes(data.nodes)
            setLinks(data.links)
            setRecieved(true)
        })
    }, [])
    return (
        <div>
            <h1 style={{textAlign: "center"}}>{name}'s Social Bubble</h1>
            {recieved &&<ForceGraph2D graphData={{nodes: nodes_, links: links_}} nodeId = "id" onNodeClick={handleNodeClick}/>}
        </div>
    )
}

export default MainPage
