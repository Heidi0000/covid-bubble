import { Component, useState, useEffect } from "react"
import { Context } from "./Store/appContext"
import { useContext } from "react";

const AddFriend = ({onAdd, setSignIn}) => {
     const [friendName1, setFriendName1] = useState('')
     const [friendName2, setFriendName2] = useState('')
     const [friendName3, setFriendName3] = useState('')
     const [friendName4, setFriendName4] = useState('')
     const {store, actions} = useContext(Context)

     const [presetFriend1, setPresetFriend1] = useState(false)
     const [presetFriend2, setPresetFriend2] = useState(false)
     const [presetFriend3, setPresetFriend3] = useState(false)
     const [presetFriend4, setPresetFriend4] = useState(false)

     const [emailArray, setEmailArray] = useState([])

    //  const token = sessionStorage["token"];

     useEffect(() => {
        actions.getIsUserAddedByFriends(setEmailArray, setFriendName1, setPresetFriend1
            , setFriendName2, setPresetFriend2
            , setFriendName3, setPresetFriend3
            , setFriendName4, setPresetFriend4
            ).then(() => {
            console.log("here is my email array", emailArray)
        });
        
        console.log("^^in addfriend, list of friends pls");
    }, []);

    // Here add:
    // - UseEffect hook to run the fetch request when the user comes to this Component
    // - Create a fetch request to the backend you created
    // - Recieve the data from the backend (array of emails)
    // - Depending on the state of the data, set friendName1 etc to the data email or set a bool saying friend email not found
    // - In the return statement, make a bool such that if friendName1 is not empty, put in friendName1 into the field, otherwise leave it blank
    const onSubmit = (e) => {
        e.preventDefault()

        const friends = {friendName1, friendName2, friendName3, friendName4}
        console.log(friends)

        var AddFriendToDB = actions.addFriendsToDB(friends);
        setSignIn(AddFriendToDB);
    }
    return (
       <form className='add-friend-container' onSubmit={onSubmit}>
           <div className='add-friend-form'> 
               <label>1.</label>
               { 
                !presetFriend1 ?
                    <input type ='text' placeholder='Add Friend'
                    value={friendName1} 
                    onChange ={(e)=>setFriendName1(e.target.value)}/>
                    :
                    <input type ='text' placeholder='friri'
                     value={friendName1} />
               }
                
            </div>
            <div className='add-friend-form'>
               <label>2.</label>
               { 
                !presetFriend2 ?
                    <input type ='text' placeholder='Add Friend'
                    value={friendName2} 
                    onChange ={(e)=>setFriendName2(e.target.value)}/>
                    :
                    <input type ='text' placeholder='friri'
                     value={friendName2} />
               }
            </div>
            <div className='add-friend-form'>
               <label>3.</label>
               { 
                !presetFriend3 ?
                    <input type ='text' placeholder='Add Friend'
                    value={friendName3} 
                    onChange ={(e)=>setFriendName3(e.target.value)}/>
                    :
                    <input type ='text' placeholder='friri'
                     value={friendName3} />
               }
            </div>
            <div className='add-friend-form'>
               <label>4.</label>
               { 
                !presetFriend4 ?
                    <input type ='text' placeholder='Add Friend'
                    value={friendName4} 
                    onChange ={(e)=>setFriendName4(e.target.value)}/>
                    :
                    <input type ='text' placeholder='friri'
                     value={friendName4} />
               }
            </div>
            
            <input type='submit' value='Continue' className='btn btn-block' />

       </form>
        
    )
}

export default AddFriend
