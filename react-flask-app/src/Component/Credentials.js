import { useState } from "react"

const {REACT_APP_TEST} = process.env;


const Credentials = ({notEntered, setnotEntered}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [remember, setRemember] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(name,email,remember)
        const credentials = {name, email}
        fetch(`${process.env.REACT_APP_TEST}/signup`,{
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(credentials)
        }).then(response => response.json()).then(data => console.log(data))
    
        setnotEntered(!notEntered)
    }
    return (
        <form onSubmit={(onSubmit)}>
            <div className='form-control'>
                <label>Name</label>
                <input 
                    type='text' 
                    placeholder='Name' 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                />
            </div>
            <div className='form-control'>
                <label>Email</label>
                <input 
                    type='text' 
                    placeholder='Email' 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className='form-control form-control-check'>
                <label>Remember me</label>
                <input 
                    type='checkbox' 
                    checked = {remember}
                    value={remember} 
                    onChange={(e) => setRemember(e.currentTarget.checked)}
                />
            </div>
            <input type='submit' value='Sign up' className='btn btn-block' />
        </form>
    )
}

export default Credentials
