import api from '../config';
import { AxiosResponse } from 'axios';


// export const getExamSettersService = (organizationId: number): Promise<AxiosResponse<any>> => {
//     return api.get<any>(`/api/v1/organization/${organizationId}/exam-setters`);
// };

export const getOrganizationRequestService = () : Promise<AxiosResponse<any>> => {
    return api.get<any>('/organization/getOrganizationRequests');
}


export const verifyOrganizationService = (id : number) : Promise<AxiosResponse<any>> => {
    return api.patch<any>('/organization/verifyOrganization/'+id)
}

interface UserDetails {
    firstName:string;
    lastName:string;
    email:string;
    password:string;
}

export const userRegistration = (details:UserDetails) : Promise<AxiosResponse<any>> => {
    return api.post<any>('/api/user/register', details);
}