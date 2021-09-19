import { useState } from "react"

const {REACT_APP_TEST} = process.env;


const AddFriend = ({onAdd, setSignIn}) => {
     const [friendName1, setFriendName1] = useState('')
     const [friendName2, setFriendName2] = useState('')
     const [friendName3, setFriendName3] = useState('')
     const [friendName4, setFriendName4] = useState('')


    const onSubmit = (e) => {
        e.preventDefault()

        const friends = {friendName1, friendName2, friendName3, friendName4}
        console.log(friends)


        
        fetch(`${process.env.REACT_APP_TEST}/addfriend`,{
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(friends)
        }).then(response => {
            response.json()
            setSignIn(true)
        }).then(data => console.log(data))
        //onAdd({friendName})
        // setnotEntered(!notEntered)
    }
    return (
       <form className='add-friend-container' onSubmit={onSubmit}>
           <div className='add-friend-form'> 
               <label>1.</label>
                <input type ='text' placeholder='Add Friend'
                value={friendName1} 
                onChange ={(e)=>setFriendName1(e.target.value)}/>
            </div>
            <div className='add-friend-form'>
               <label>2.</label>
                <input type ='text' placeholder='Add Friend'
                value={friendName2} 
                onChange ={(e)=>setFriendName2(e.target.value)}/>
            </div>
            <div className='add-friend-form'>
               <label>3.</label>
                <input type ='text' placeholder='Add Friend'
                value={friendName3} 
                onChange ={(e)=>setFriendName3(e.target.value)}/>
            </div>
            <div className='add-friend-form'>
               <label>4.</label>
                <input type ='text' placeholder='Add Friend'
                value={friendName4} 
                onChange ={(e)=>setFriendName4(e.target.value)}/>
            </div>
            
            <input type='submit' value='Continue' className='btn btn-block' />

       </form>
        
    )
}

export default AddFriend
