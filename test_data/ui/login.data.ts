import { Users, UserRole } from '@env/users';

interface InvalidLoginCases {
    name: string;
    email: string;
    password: string;
    message: string;
}

export function getInvalidLoginCases(role: UserRole): InvalidLoginCases[] {

    const user = Users[role];

    return [
        {
            name: `${role} - Invalid Email`,
            email: 'invalid@example.com',
            password: user.password,
            message: 'Invalid email or password'
        },
        {
            name: `${role} - Invalid Password`,
            email: user.username,
            password: '123456789',
            message: 'Invalid email or password'
        },
        {
            name: `${role} - Blank Email`,
            email: '',
            password: user.password,
            message: 'The Email Address field is required.'
        },
        {
            name: `${role} - Blank Password`,
            email: user.username,
            password: '',
            message: 'The Password field is required.'
        }
    ];
}