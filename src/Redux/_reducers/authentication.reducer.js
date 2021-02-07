const initialState = { loggedIn: false, user : '', userType: 0};

export function authentication(state = initialState, action){
    switch (action.type) {
        case 'USER_LOGIN':
            return {loggedIn: true, user: action.user, userType: action.userType};
        case 'USER_LOGOUT':
            return {loggedIn: false, user : '', userType: 0};
        default:
            return state;
    }
}