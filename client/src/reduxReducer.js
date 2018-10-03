const initState = {
    isAuth:false,
    username:false
}

const reducer = (state=initState, action) => {
    if(action.type === "USERLOGGEDIN"){
        return {
            ...state,
            isAuth:true,
            username:action.username
        }
    }
    return state;
}

export default reducer