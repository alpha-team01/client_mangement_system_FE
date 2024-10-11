import api from '../config';
import { AxiosResponse } from 'axios';



export const getallUsers = () : Promise<AxiosResponse<any>> => {
    return api.get<any>('/api/user/getAllUsers');
}

export const getAllCustomers = () : Promise<AxiosResponse<any>> => {
    return api.get<any>('/api/customer/getAllCustomers');
}

