import { useState, useEffect } from "react"


const MainPage = () => {
    const [data, setData] = useState({})
    useEffect(() => {
        fetch(`${process.env.REACT_APP_TEST}/mainpage/session`)
        .then(response => response.json())
        .then(data => console.log(data))
    }, [])
    return (
        <div>
            <h1>Mainpage</h1>
            {/* {data.length > 0 && data.map(field => <div>{field}</div>)} */}
        </div>
    )
}

export default MainPage
