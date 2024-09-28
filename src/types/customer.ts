// Define types for data structure
export type Customer = {
    key: string;
    passportNo: string;
    status: {
      title: "Registered" | "Offer Information" | "Work Permit Details" | "Visa Information";
      description: "Pending" | "Finished";
    };
    actions: string;
  }