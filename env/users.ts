export const Users = {
    admin: {
        username: process.env.ADMIN_USERNAME!,
        password: process.env.ADMIN_PASSWORD!,
    },

    projectmanager: {
        username: process.env.PROJECTMANAGER_USERNAME!,
        password: process.env.PROJECTMANAGER_PASSWORD!,
    },
};

export type UserRole = keyof typeof Users;