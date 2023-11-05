import { Strategy } from 'passport';

export interface PassportStrategy {
    name: string;
    strategy: Strategy;
}

declare global {
    namespace Express {
        interface User {
            id: number;
            email: string;
            password: string;
            role: string;
            activeSession?: string | null;
        }
    }
}