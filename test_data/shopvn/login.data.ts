interface InvalidLoginCases {
    name: string;
    email: string;
    password: string;
    message: string;
}

export const invalidLoginCases: InvalidLoginCases[] = [
    {
        name: 'Invalid Email',
        email: 'bindz@gmail.com',
        password: process.env.PASSWORD!,
        message: '⚠️ Tài khoản hoặc mật khẩu không đúng.',
    },

    {
        name: 'Invalid Password',
        email: process.env.USERNAME!,
        password: 'bin1234567890',
        message: '⚠️ Tài khoản hoặc mật khẩu không đúng.',
    },
    {
        name: 'Blank Email',
        email: '',
        password: process.env.PASSWORD!,
        message: '⚠️ Vui lòng nhập đầy đủ tài khoản và mật khẩu.'
    },
    {
        name: 'Blank Password',
        email: process.env.USERNAME!,
        password: '',
        message: '⚠️ Vui lòng nhập đầy đủ tài khoản và mật khẩu.'
    }
];