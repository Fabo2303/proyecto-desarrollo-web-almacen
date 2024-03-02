export type Uemail = {
    email: string;
    name: string;
    password: string;
}

export async function login(email: string, password: string) : Promise<Uemail>{
    const response = await fetch(`http://localhost:8080/uemail/login/${email}/${password}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    console.log(response);
    return await response.json();
}

export async function saveUemail(uemail : Uemail): Promise<Uemail> {
    const response = await fetch('http://localhost:8080/uemail/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(uemail)
    });
    return await response.json();
}