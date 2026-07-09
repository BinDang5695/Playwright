export interface LoginValidation {
  title: string;
  data: {
    email?: string;
    password?: string;
  };
  expectedErrors: Array<{ field: string; message: string }>;
};