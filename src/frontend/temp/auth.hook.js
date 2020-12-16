import {useState, useCallback, useEffect} from 'react';

const storageName = 'userData';

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [userID, setUserID] = useState(null); 

    const login = useCallback((JWTtoken, id) => {
        setToken(JWTtoken);
        setUserID(id);

        localStorage.setItem(storageName, JSON.stringify({
            token: JWTtoken, userID: id
        }))
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUserID(null);
        localStorage.removeItem(storageName);
    }, []);

    useEffect( ()=> {
        const data = JSON.parse(localStorage.getItem(storageName));
        if (data && data.token) {
            login(data.token, data.userID);
        }
    }, [login]);

    return {login, logout, token, userID};
}