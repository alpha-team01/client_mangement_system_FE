import api from "../config";
import { AxiosResponse } from "axios";

export const getallUsers = (): Promise<AxiosResponse<any>> => {
  return api.post<any>("/api/user/getAllUsers");
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
  fileType: any,
  passNum: string
) => {
  const folderIds = {
    passport:import.meta.env.VITE_PASSPORT_FOLDER_ID,
    policeReport:import.meta.env.VITE_POLICE_REPORT_FOLDER_ID,
    cv:import.meta.env.VITE_CV_FOLDER_ID,
    birthCertificate:import.meta.env.VITE_BIRTH_CERTIFICATE_FOLDER_ID,
    photo:import.meta.env.VITE_PHOTO_FOLDER_ID,
  };

  const uniqueIdentifier = `${passNum}_${new Date().toISOString()}`;

  const formData = new FormData();
  formData.append("file", file);

  const folderId = folderIds[fileType];

  const response = await api.post(
    `/api/drive/upload`,
    formData,
    {
      params: {
        folderId,
        uniqueIdentifier,
      },
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  // Return the uploaded file URL
  return response.data;
};

// Helper function to register the customer with uploaded file URLs
export const registerCustomer = async (formData: any) => {
  const response = await api.post(
    `/api/customer/register`,
    formData
  );
  return response.data;
};
