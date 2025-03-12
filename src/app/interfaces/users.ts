export interface User {
    _id?: string;
    name: string;
    // surname?: string;
    username: string;
    email: string;
    password: string;
    role: string;
    imgProfile?: string;
    comments?:{};
}
