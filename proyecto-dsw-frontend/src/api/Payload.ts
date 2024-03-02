export type UserPayload = {
    role: string;
    permissions: string[];
    name: string;
    sub: string;
    iat: number;
    exp: number;
}

export function getDataUser() {
    const jwt = localStorage.getItem('jwt');
    if (jwt != null) {
        try {
            const payload = jwt.split('.')[1];
            const decoded = JSON.parse(atob(payload));
            return decoded;
        } catch (e) {
            return null;
        }
    }
    return null;
}