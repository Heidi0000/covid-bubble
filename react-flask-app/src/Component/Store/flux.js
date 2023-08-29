const getState = ({ getStore, getActions, setStore }) => {
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
			addFriendsToDB: async (friends) => {
				// syncTokenFromSessionStore();
				const store = getStore();

				var friendsList = {};
				var i = 1;
				friends.forEach((friend) => {
					if(!friend.delete) {
						friendsList[i] = friend.name;
						i++;
					}
				});
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
					//hopefully this data is the list of gmails
					return true;
				}
				catch (error){
					console.error("ERROR add friends to db in flux")
					return true;
				}
			},
			getFriends: async () =>{
				const store = getStore();
				const opts = {
					headers: {
						"Authorization": "Bearer " + store.token
					}
				}
				const response = await fetch(`${process.env.REACT_APP_TEST}/loadAddFriend`, opts)
				if (response.status!==200){ 
					alert('idk what this error would be');
					return false;
				}
				const data = await response.text();
				return data;
			},
			getGraph: async (setNodes, setName, setLinks) => {
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