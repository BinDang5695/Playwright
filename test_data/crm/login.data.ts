interface InvalidLoginCase {
  name: string;
  email: string;
  password: string;
  message: string;
}

export const invalidLoginCases: InvalidLoginCase[] = [
  {
    name: 'Invalid Email',
    email: 'admin123@example.com',
    password: process.env.PASSWORD!,
    message: 'Invalid email or password'
  },
  {
    name: 'Invalid Password',
    email: process.env.USERNAME!,
    password: '123456789',
    message: 'Invalid email or password'
  },
  {
    name: 'Blank Email',
    email: '',
    password: process.env.PASSWORD!,
    message: 'The Email Address field is required.'
  },
  {
    name: 'Blank Password',
    email: process.env.USERNAME!,
    password: '',
    message: 'The Password field is required.'
  }
];