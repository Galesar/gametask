import { useCallback, useEffect, useState } from "react";
import { useHttp } from "./useHttp";
import localStore from 'store'

export default function useAuth() {
    const [token, setToken] = useState('');
    const [userID, setUserID] = useState('');

    const login = useCallback((tempToken, tempUserId) => {
        setToken(tempToken);
        setUserID(tempUserId);
        localStore.set('user', {
            access_token: tempToken,
            id: tempUserId
        });
    }, []);
    const logout = useCallback(() => {
        setToken(null);
        setUserID(null);
        localStore.remove('user');
    }, []);

    useEffect(() => {
        const data = localStore.get('user');
        console.log(data);
        if(data && data.access_token) {
            login(data.access_token, data.id)
        }
    }, [login])

    return {login, logout, userID, token}
}