import { Component, useState, useEffect } from "react"
import { Context } from "./Store/appContext"
import { useContext } from "react";
import { Scrollbar } from 'react-scrollbars-custom';

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
       <form className='box-content-container' onSubmit={onSubmit}>
           <div className="friends-list-scroll-area">
            <Scrollbar style={{  height: 120 }}>     
                {friendsList.map(friend => {
                    return (
                        <div id={friend.id}  key={friend.id + friend.name} 
                        className={friend.delete ? "friend strike-thru" : "friend"} 
                        onClick={crossOutFriend}>
                            <span className="highlight">{friend.name}</span>
                        </div>
                    )
                })}
            </Scrollbar>    
           </div>
           <div className="add-new-friend-header">
                Add New Friend
           </div>
           <div className="user-input-form">
           <input className="user-text-input" value={userInput} type="text" placeholder="Enter friend's email"
            onChange={(e) => {setUserInput(e.currentTarget.value)}}/>
            <button onClick={handleAddFriend}></button>
           </div>
            <input type='submit' value='View Bubble' className='main-button' />
       </form>
    )
}

export default AddFriend
