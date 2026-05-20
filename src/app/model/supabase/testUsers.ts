export type TestUser = {
    displayName: string,
    email: string,
    password: string,
}

export const TestUsersLogins: TestUser[] = [
    {
        displayName: 'Admin',
        email: 'admin@email.com',
        password: 'admin123',
    },
    {
        displayName: 'Usuario 1',
        email: 'user1@email.com',
        password: 'user123',
    },
    {
        displayName: 'Usuario 2',
        email: 'user2@email.com',
        password: 'user123',
    }
];