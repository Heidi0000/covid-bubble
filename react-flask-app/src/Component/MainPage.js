import { useState, useEffect } from "react"
import { ForceGraph2D } from 'react-force-graph'
const MainPage = () => {
    const [nodes_, setNodes] = useState([])
    const [links_,setLinks] = useState([])
    const [name, setName] = useState([])
    const [recieved, setRecieved] = useState(false)
 
    useEffect(() => {
        fetch(`${process.env.REACT_APP_TEST}/mainpage/session`)
        .then(response => response.json())
        .then(data => {
            setName(data.user)
            setNodes(data.nodes)
            console.log(data.nodes)

            setLinks(data.links)
            console.log(data.links)

            setRecieved(true)
        })
    }, [])
    return (
        <div>
            {recieved ? 
                <div>
                    <h1 style={{textAlign: "center"}}>{name}'s Social Bubble</h1>
                    <ForceGraph2D graphData={{nodes: nodes_, links: links_}} nodeId = "id" />
                </div>
            : <h1 style={{textAlign: "center"}}>Loading...</h1>}
        </div>
    )
}

export default MainPage
