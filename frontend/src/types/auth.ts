export interface LoginRequest {
    email: string;
    password: string;
}

export interface User {
    _id: string;
    name: string;
    role: "admin" | "user";
    email: string;
}

export interface loginResponse {
    accessToken: string;
    user: User;
}