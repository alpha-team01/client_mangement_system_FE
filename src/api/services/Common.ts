import api from "../config";
import { AxiosResponse } from "axios";

export const getallUsers = (): Promise<AxiosResponse<any>> => {
  return api.get<any>("/api/user/getAllUsers");
};

export const getAllCustomers = (): Promise<AxiosResponse<any>> => {
  return api.get<any>("/api/customer/getAllCustomers");
};

export const getCustomerById = (
  customerId: string
): Promise<AxiosResponse<any>> => {
  return api.get<any>(`/api/customer/getCustomerAllDetails/${customerId}`);
};

// Helper function to upload a single file to Google Drive
export const uploadCustomerFile = async (
  file: File,
  fileType: 'passport' | 'policeReport' | 'cv' | 'birthCertificate' | 'photo',
  passNum: string
) => {
  const folderIds = {
    passport: import.meta.env.VITE_PASSPORT_FOLDER_ID,
    policeReport: import.meta.env.VITE_POLICE_REPORT_FOLDER_ID,
    cv: import.meta.env.VITE_CV_FOLDER_ID,
    birthCertificate: import.meta.env.VITE_BIRTH_CERTIFICATE_FOLDER_ID,
    photo: import.meta.env.VITE_PHOTO_FOLDER_ID,
  };

  const uniqueIdentifier = `${passNum}_${new Date().toISOString()}`;

  const formData = new FormData();
  formData.append("file", file);

  const folderId = folderIds[fileType];

  const response = await api.post(`/api/drive/upload`, formData, {
    params: {
      folderId,
      uniqueIdentifier,
    },
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  // Return the uploaded file URL
  return response.data;
};

// Helper function to register the customer with uploaded file URLs
export const registerCustomer = async (formData: any) => {
  const response = await api.post(`/api/customer/register`, formData);
  return response.data;
};

// Helper function to get the all admin users
export const getAllAdminUsers = (): Promise<AxiosResponse<any>> => {
  return api.get<any>("/api/user/getAdminUserList");
};

export const uploadCustomerPaymentSlip = async (
  file: File,
  paymentId: string
) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post(`/api/drive/upload`, formData, {
    params: {
      folderId: import.meta.env.VITE_OFFER_PHASE_PAY_SLIPS,
      uniqueIdentifier: paymentId,
    },
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  // Return the uploaded file URL
  return response.data;
};

export const makeCustomerPayment = async (formData: any) => {
  const response = await api.post(
    `/api/customer/makePayment/${formData.customerId}`,
    formData
  );
  return response.data;
};

export const uploadOfferLetter = async (file: File, customerId: string) => {
  const formData = new FormData();
  formData.append("file", file);

  const uniqueIdentifier = `${customerId}_${new Date().toISOString()}`;

  const response = await api.post(`/api/drive/upload`, formData, {
    params: {
      folderId: import.meta.env.VITE_OFFER_PHASE_DOC,
      uniqueIdentifier: uniqueIdentifier,
    },
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  // Return the uploaded file URL
  return response.data;
};

export const uploadOfferLetterToDb = async (formData: any, customerId: any) => {
  const response = await api.post(`/api/customer/uploadCustomerDoc/${customerId}`, formData);
  return response.data;
};

export const uploadWorkPermit = async (file: File, customerId: string) => {
  const formData = new FormData();
  formData.append("file", file);

  const uniqueIdentifier = `${customerId}_${new Date().toISOString()}`;

  const response = await api.post(`/api/drive/upload`, formData, {
    params: {
      folderId: import.meta.env.VITE_WORK_PERMIT_PHASE_DOC,
      uniqueIdentifier: uniqueIdentifier,
    },
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  // Return the uploaded file URL
  return response.data;
};

export const uploadWorkPermitPaymentSlip = async (
  file: File,
  paymentId: string
) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post(`/api/drive/upload`, formData, {
    params: {
      folderId: import.meta.env.VITE_WORK_PERMIT_PHASE_PAY_SLIPS,
      uniqueIdentifier: paymentId,
    },
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  // Return the uploaded file URL
  return response.data;
};

export const uploadWorkPermitToDb = async (formData: any, customerId :any) => {
  const response = await api.post(`/api/customer/uploadCustomerDoc/${customerId}`, formData);
  return response.data;
};


// update Users Personal Details of the account
export const updateUsersAccountDetails = async (formData: any , customerId : any) => {
  const response = await api.put(`/api/user/updateUser/${customerId}`, formData);
  return response.data;
};

export const getCustomerStateWiseDocDetails = async (customerId: any, state : any) => {
  const response = await api.get(`/api/customer/${customerId}/stateWiseCustomerDetails/${state}`);
  return response.data;
}


// visa information prcess
// uploadVisaInfoamation,
//   uploadVisaInfoamationPaymentSlip,
//   uploadVisaInfoamationToDb,

export const uploadVisaInfoamation = async (file: File, customerId: string) => {
  const formData = new FormData();
  formData.append("file", file);

  const uniqueIdentifier = `${customerId}_${new Date().toISOString()}`;

  const response = await api.post(`/api/drive/upload`, formData, {
    params: {
      folderId: import.meta.env.VITE_VISA_PHASE_DOC,
      uniqueIdentifier: uniqueIdentifier,
    },
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  // Return the uploaded file URL
  return response.data;
};

export const uploadVisaInfoamationPaymentSlip = async (
  file: File,
  paymentId: string
) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post(`/api/drive/upload`, formData, {
    params: {
      folderId: import.meta.env.VITE_VISA_PHASE_PAY_SLIPS,
      uniqueIdentifier: paymentId,
    },
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  // Return the uploaded file URL
  return response.data;
};

export const uploadVisaInfoamationToDb = async (formData: any, customerId: any) => {
  const response = await api.post(`/api/customer/uploadCustomerDoc/${customerId}`, formData);
  return response.data;
};

export const getDashboardCardStats = async () => {
  const response = await api.get(`/api/dashboard/getAllCustomerCount`);
  return response.data;
}

export const getMonthlyStateDetails = async () => {
  const response = await api.get(`/api/dashboard/monthlyStateDetailStats`)
  return response.data;
}