export async function getContacts() {
  const res = await fetch(
    "https://contactbuddy-json-server-api.vercel.app/contacts",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await res.json();
  return data;
}

export async function createContact(payload) {
  await fetch("https://contactbuddy-json-server-api.vercel.app/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}

export async function editContact(payload) {
  await fetch(
    `https://contactbuddy-json-server-api.vercel.app/contacts/${payload.id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );
}

export async function deleteContact(id) {
  await fetch(
    `https://contactbuddy-json-server-api.vercel.app/contacts/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

export async function searchContact(q) {
  const res = await fetch(
    `https://contactbuddy-json-server-api.vercel.app/contacts?q=${q}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await res.json();
  return data;
}

export async function getContact(id) {
  const res = await fetch(
    `https://contactbuddy-json-server-api.vercel.app/contacts/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) throw new Error("⚠ The contact you specified not found!");
  const data = await res.json();
  return data;
}
