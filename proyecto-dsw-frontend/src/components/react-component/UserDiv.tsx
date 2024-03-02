import { useEffect, useState } from "react";
import { getDataUser, type UserPayload } from "src/api/Payload";


export default function UserDiv() {
    const [user, setUser] = useState<UserPayload>();

    useEffect(() => {
        const us: UserPayload = getDataUser();
        if (!us) {
            window.location.href = '/login';
        }
        setUser(us);
    }, []);

    return (
        <div className="py-4">
            <a href="/usuario" className="flex flex-col items-center gap-y-4">
                <h1 className="text-2xl">
                    {user?.name}
                </h1>
                <h1 className="text-2xl">
                    {user?.role}
                </h1>
            </a>
        </div>
    );
}