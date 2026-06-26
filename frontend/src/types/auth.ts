export interface LoginRequest {
    email: string;
    password: string;
}

export interface User {
    id: string;
    name: string;
    role: "admin" | "user";
}

export interface loginResponse {
    accessToken: string;
    user: User;
}