import api from '../config';
import { AxiosResponse } from 'axios';

interface Details {
    passportNumber: string;
  policeReportIssueDate : string;
  passportDocUrl : string;
  policeReportDocUrl : string;
  cvUrl : string;
  birthCertificateDoUrl : string;
  photoUrl : string;
  roleId : 0;
  stateId : 0;
}

export const registerUser = (details:Details) : Promise<AxiosResponse<any>> => {
    return api.post<any>('/api/user/register', details);
}