export type RegistrationDetails = {
  customerId: number;
  passportNumber: string;
  policeReportIssueDate: string;
  policeReportExpDate: string | null;
  passportDocUrl: string;
  policeReportDocUrl: string;
  cvUrl: string;
  birthCertificateDoUrl: string;
  photoUrl: string;
  stateName: string;
  stateId: number;
  customerOwnerName: string;
  customerOwnerId: number;
};

export type PaymentDetails = {
  amount: string;
  receivedDate: string;
  receivedBy: string;
  paymentReceiptUrl: string;
};

export type StateWiseDocDetails = {
  stateId: number;
  stageName: string;
  docId: number;
  docUrl: string;
  totalAmount: string;
  remainingAmount: string;
  status: string;
  stateWisePaymentDetails: PaymentDetails[];
};

