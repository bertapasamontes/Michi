export interface User {
    _id?: number;
    name: string;
    surname?: string;
    username: string;
    email: string;
    password: string;
    role: 'viewer' | 'admin';
}
