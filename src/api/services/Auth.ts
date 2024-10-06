import api from '../config';
import { AxiosResponse } from 'axios';

interface Credentials {
    email: string;
    password: string;
}

interface User {
    email: string;
    firstName: string;
    lastName: string;
    roleId: number;
    role: string;
}

export const postSignIn = (credentials: Credentials): Promise<AxiosResponse<any>> => {
    return api.post<any>('/api/user/login', credentials)
        .then((response) => {
            if (response.status === 200) {
                const user: User = response.data.reponseObject;
            }
            return response;
        })
        .catch((error) => {
            console.error('Login error:', error);
            throw error;
        });
};

export const doSignOut = () : Promise<any> => {
    // clear local storage
    localStorage.clear();
    return Promise.resolve();
}