import api from '../config';
import { AxiosResponse } from 'axios';


export const getallUsers = () : Promise<AxiosResponse<any>> => {
    return api.post<any>('/api/user/getAllUsers');
}