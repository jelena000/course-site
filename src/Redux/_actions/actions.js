
export function loggInUser(user, userType) { 
	console.log("Succcess", user);
	return { type: 'USER_LOGIN', user, userType };
}

export function logout() { 
	console.log("USER_LOGOUT");

	return { type: 'USER_LOGOUT'} ;
}

