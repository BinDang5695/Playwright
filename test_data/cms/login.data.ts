interface InvalidLoginCases {
  name: string;
  email: string;
  password: string;
  message: string;
}

export const invalidLoginCases: InvalidLoginCases[] = [
  {
    name: 'Invalid Email',
    email: 'admin123@example.com',
    password: process.env.PASSWORD!,
    message: 'Invalid login credentials',
  },

  {
    name: 'Invalid Password',
    email: process.env.USERNAME!,
    password: '123456789',
    message: 'Invalid login credentials',
  },
];