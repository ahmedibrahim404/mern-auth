const mapStateToProps = state => {
    return {
        username: state.username
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onUserLogin: (username) => {
            if(typeof dispatch == 'function'){
                dispatch({ type:'USERLOGGEDIN', username:username })
            }
        }
    }
}

export { mapStateToProps, mapDispatchToProps };