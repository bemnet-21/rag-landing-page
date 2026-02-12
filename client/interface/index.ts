export interface User {
    id: string;
    email: string;
    name: string;
    role: string;
}

export interface AuthGuardProps {
    children: React.ReactNode;
    allowedRoles?: string[];
}