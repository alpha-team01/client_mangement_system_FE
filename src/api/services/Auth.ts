import api from '../config';
import { AxiosResponse } from 'axios';

interface Credentials {
    email: string;
    password: string;
}

export const postSignIn = (credentials : Credentials) : Promise<AxiosResponse<any>> => {
    return api.post<any>('/api/user/login',  credentials);
}