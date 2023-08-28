const getState = ({ getStore, getActions, setStore }) => {
	console.log("IN GETSTAE")

	return {
		store: {
			token: null,
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			syncTokenFromSessionStore: () => {
				const token = sessionStorage.getItem("token");
				console.log("App just loaded, syncing local sessionstorage", token)
				if (token && token != "" && token != undefined) setStore({token: token});
			},

			logout: () => {
				sessionStorage.removeItem("token");
				console.log("Log out");
				setStore({token: null});
			},


            login:  async (email, password) => {
                const opts = {
                    method: 'POST',
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                };

                try {
                    const response = await fetch(`${process.env.REACT_APP_TEST}/signin`, opts)
                    if (response.status!==200){ 
                        alert('Incorrect Email or Password');
                        return false;
                    }
                    
                    const data = await response.json();
                    console.log("this came from the backend", data);
                    sessionStorage.setItem("token", data.access_token);
					setStore({token: data.access_token});
                    return true;
                }
                catch (error){
                    console.error("ERROR login in")
                }
                
                
            },

			signup: async (name, email, password) => {
				const opts = {
					method: 'POST',
					headers: {"Content-Type": "application/json"},
					body: JSON.stringify({
						name: name,
						email: email,
						password: password
					})
				};
				const response = await fetch(`${process.env.REACT_APP_TEST}/signup`, opts);

				if (response.status!==200){ 
					alert('Incorrect Email or Password');
					return false;
				}
				console.log("ok so it comes here? and its fine?")
				const data = await response.json();
				console.log(data);
				sessionStorage.setItem("token", data.token);
				setStore({token: data.token});
				return true;
			},
			// getIsUserAddedByFriends: async (setEmailArray,  setFriendName1, setPresetFriend1
			// 	, setFriendName2, setPresetFriend2
			// 	, setFriendName3, setPresetFriend3
			// 	, setFriendName4, setPresetFriend4) => {
			// 	console.log("IN GET IS USER ADDED")
			// 	const store = getStore();
			// 	const opts = {
			// 		headers: {
			// 			"Authorization": "Bearer " + store.token
			// 		}
			// 	}
			// 	try {
			// 		const response = await fetch(`${process.env.REACT_APP_TEST}/loadAddFriend`, opts)
			// 		if (response.status!==200){ 
			// 			alert('idk what this error would be');
			// 			return false;
			// 		}
			// 		const data = await response.json();
			// 		console.log(data);
			// 		var emailArray = data.emails
			// 		setEmailArray(data.emails)
			// 		for ( let i = 0; i< emailArray.length; i++){
			// 			if (i ==0){
			// 				console.log("11111")
			// 			setFriendName1(emailArray[0]) ;
			// 			setPresetFriend1(true); 
			// 			}if (i ==1){
			// 				console.log("22222")

			// 				setFriendName2(emailArray[1]) ; 
			// 				setPresetFriend2(true); 

			// 			}if (i ==2){
			// 				console.log("33333")

			// 				setFriendName3(emailArray[2]) ; 
			// 			setPresetFriend3(true); 

			// 			}if (i ==3){
			// 				console.log("44444")

			// 				setFriendName4(emailArray[3]) ; 
			// 				setPresetFriend4(true); 
			// 			}
      //       		}
					
			// 		//hopefully this data is the list of gmails
			// 		return true;
			// 	}
			// 	catch (error){
			// 		console.error("ERROR get is user added by friends in flux")
			// 	}
			// },
			addFriendsToDB: async (friends) => {
				console.log("so whats the matter here");
				// syncTokenFromSessionStore();
				const store = getStore();
				console.log("friends", friends);

				var friendsList = {};
				var i = 1;
				console.log("friends", friends);
				friends.forEach((friend) => {
					if(!friend.delete) {
						friendsList[i] = friend.name;
						i++;
					}
				});
				console.log("22244", store.token);
				console.log("is this the prob", friendsList)
				const opts = {
					method: 'POST',
					headers: {"Content-Type": "application/json", "Authorization": "Bearer " + store.token},
					body: JSON.stringify(friendsList)
				};

				try {
					const response = await fetch(`${process.env.REACT_APP_TEST}/addfriend`, opts)
					// if (response.status!==200){ 
					// 	console.log(response.status, "response status");
					// 	alert('idk what this error would be in add friends to db');
					// 	return false;
					// }
					const data = await response.json();
					console.log(data);
					// setSignIn(true);
					//hopefully this data is the list of gmails
					return true;
				}
				catch (error){
					console.error("ERROR add friends to db in flux")
				}
			},
			getGraph: async (setNodes, setName, setLinks) => {
				console.log("IN GET GRAPH?")
				const store = getStore();
				const opts = {
					headers: {
						"Authorization": "Bearer " + store.token
					}
				}
				try {
					const response = await fetch(`${process.env.REACT_APP_TEST}/mainpage/session`, opts)
					if (response.status!==200){ 
						alert('Error, no email found in the database');
						return false;
					}
					const data = await response.json();
					console.log("this came from the graph", data);
					setNodes(data.nodes);
					setLinks(data.links);
					setName(data.user);
					return true;
				}
				catch (error){
					console.error("ERROR get graph")
				}
			},

			getMessage: () => {
				// fetching data from the backend
				fetch(process.env.BACKEND_URL + "/api/hello")
					.then(resp => resp.json())
					.then(data => setStore({ message: data.message }))
					.catch(error => console.log("Error loading message from backend", error));
			},

			changeColor: (index, color) => {
				//get the store
				console.log("IN CHANGE OCLR?")

				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;