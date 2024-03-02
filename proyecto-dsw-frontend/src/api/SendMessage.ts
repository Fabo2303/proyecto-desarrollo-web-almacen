export type Uemail = {
  email: string;
  name: string;
  password: string;
}

export type Message = {
  id: number;
  uemail: Uemail;
  sender: string;
  subject: string;
  message: string;
}


export async function get(email: string): Promise<Uemail> {
  const response = await fetch(`http://localhost:8080/uemail/get/${email}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  });
  console.log(response);
  return await response.json();
}

export async function sendCodeVerification(email: string, codigo: string) {
  const uemail = await get(email);
  console.log({
    uemail,
    "subject": "Código de verificación",
    "sender": "Administración",
    "message": `Su código de verificación es: ${codigo}`
  })
  try {
    const response = await fetch(`http://localhost:8080/message/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        uemail,
        "subject": "Código de verificación",
        "sender": "Administración",
        "message": `Su código de verificación es: ${codigo}`
      })
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}