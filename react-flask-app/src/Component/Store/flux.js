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
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			syncTokenFromSessionStore: () => {
				const token = sessionStorage.getItem("token");
				console.log("App just loaded, syncing local sessionstorage")
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
				const data = await response.json();
				console.log(data);
				sessionStorage.setItem("token", data.token);
				setStore({token: data.token});
				return true;
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