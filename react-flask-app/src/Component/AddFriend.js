import { useState, useEffect } from "react"
import { Context } from "./Store/appContext"
import { useContext } from "react";
import { Scrollbar } from 'react-scrollbars-custom';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const AddFriend = ({onAdd, setSignIn}) => {
    const [friendsList, setFriendsList] = useState([])
    const [userInput, setUserInput] = useState('');
    const {actions} = useContext(Context)
    const history = useHistory();
    const [rerender, setRerender] = useState(false);

    //when componnet mounts
    useEffect(() => {
        const onMountButNeedAsync = async () => {
            var friendsListString = await actions.getFriends();
            friendsListString = friendsListString.trim();
            if (typeof friendsListString === 'string' || friendsListString instanceof String){
                const existingFriendsList = friendsListString.split(' ');
                let temp = friendsList;
                existingFriendsList.map(friend => {
                    temp.push({id: existingFriendsList.length + 1, name: friend, delete: false });
                });
                setFriendsList(temp);
                setRerender(!rerender);
            }   
        } 
        onMountButNeedAsync();
    }, []);

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

    const onSubmit = (e) => {
        e.preventDefault()
        var AddFriendToDB = actions.addFriendsToDB(friendsList);
        setSignIn(AddFriendToDB);
        history.push('/mainpage')
    }
    return (
        <div className="box-container">
            <h1 className="header-title">Friends List</h1>
            <form className='box-content-container' onSubmit={onSubmit}>
                <div className="friends-list-scroll-area">
                    <Scrollbar style={{  height: 120 }}>     
                        {friendsList.map(friend => {
                            return (
                                <div id={friend.id}  key={friend.id + friend.name} 
                                className="friend"
                                onClick={crossOutFriend}>
                                    <span className={friend.delete ? "highlight strike-thru" : "highlight"} >
                                        {friend.name}
                                    </span>
                                </div>
                            )
                        })}
                    </Scrollbar>    
                </div>
                <div className="add-new-friend-header">Add New Friend</div>
                <div className="user-input-form">
                    <input className="user-text-input" value={userInput} type="text" placeholder="Enter friend's email"
                    onChange={(e) => {setUserInput(e.currentTarget.value)}}/>
                    <button style={{display: 'none'}} onClick={handleAddFriend}></button>
                </div>
                <input type='submit' value='View Bubble' className='main-button' />
            </form>
       </div>
    )
}

export default AddFriend;
