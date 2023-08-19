import { Component, useState, useEffect } from "react"
import { Context } from "./Store/appContext"
import { useContext } from "react";

const AddFriend = ({onAdd, setSignIn}) => {
    const [friendsList, setFriendsList] = useState([])
    const [ userInput, setUserInput ] = useState('');
    const {store, actions} = useContext(Context)

    const handleAddFriend = (e) => {
        e.preventDefault();
        addFriendToList(userInput);
        setUserInput("");
    };

    //to remove friend (just crossing out)
    const crossOutFriend = (e) => {
        e.preventDefault()
        handleToggle(e.currentTarget.id)
    }; 

    const handleToggle = (id) => {
        let mapped = friendsList.map(friend => {
          return friend.id == id ? { ...friend, delete: !friend.delete } : { ...friend};
        });
        setFriendsList(mapped);
    }

    const addFriendToList = (userInput) => {
        let temp = friendsList;
        temp.push({id: friendsList.length + 1, name: userInput, delete: false });
        setFriendsList(temp);
    }
    //  const token = sessionStorage["token"];

    // Here add:
    // - UseEffect hook to run the fetch request when the user comes to this Component
    // - Create a fetch request to the backend you created
    // - Recieve the data from the backend (array of emails)
    // - Depending on the state of the data, set friendName1 etc to the data email or set a bool saying friend email not found
    // - In the return statement, make a bool such that if friendName1 is not empty, put in friendName1 into the field, otherwise leave it blank
    const onSubmit = (e) => {
        e.preventDefault()
        var AddFriendToDB = actions.addFriendsToDB(friendsList);
        setSignIn(AddFriendToDB);
    }
    return (
       <form className='add-friend-container' onSubmit={onSubmit}>
           <div className='add-friend-form'> 
                {friendsList.map(friend => {
                    return (
                        <div id={friend.id}  key={friend.id + friend.name} className={friend.delete ? "strike-thru" : ""} 
                            onClick={crossOutFriend}
                        >
                            {friend.name}
                        </div>
                    )
                })}
                <input value={userInput} type="text" placeholder="Add new friend"
                    onChange={(e) => {setUserInput(e.currentTarget.value)}}
                />
                <button onClick={handleAddFriend} >Submit</button>
            </div>
            <input type='submit' value='Continue' className='btn btn-block' />
       </form>
    )
}

export default AddFriend
