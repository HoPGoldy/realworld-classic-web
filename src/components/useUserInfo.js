import { useState, useEffect } from 'react';
import api from '@/api';

const useUserInfo = function (username) {
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        const fetchUserInfo = async () => {
            const data = await api.get(`/profiles/${username}`)
            setUserInfo(data.profile)
        }

        fetchUserInfo();
    }, [username]);

    return [userInfo, setUserInfo];
}

export default useUserInfo;