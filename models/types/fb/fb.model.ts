export interface FBValidation {
  title: string;
  data: {
    firstName?: string;
    surName?: string;
    clubName?: string;
    address?: string;
    phoneNumber?: string;
    email?: string;
    emails?: string[];
    emailCount?: number;
    consent?: boolean | string;
    captcha?: string;
  };
  expectedErrors: Array<{ field: string; message: string }>;
};