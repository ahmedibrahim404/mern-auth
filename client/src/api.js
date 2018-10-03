const API = '';

export function registerAccount(username, email, password){
    return fetch(`${API}/auth/register`, {
        body:JSON.stringify({ username, email, password }),
        headers: {
            'Content-Type':'application/json'
        },
        method:"POST"
    });
}

export function loginUser(username, password){
    return fetch(`${API}/auth/login`, {
        body:JSON.stringify({ username, password }),
        headers: {
            'Content-Type':'application/json'
        },
        method:"POST"
    });
}

export function checkAuth(){
    return fetch(`${API}/auth/checkauth`, {
        headers: {
            'Content-Type': 'application/json',
            'token': localStorage.getItem('authToken')
        },
        method:"POST"
    })
}