import { useLoaderData, redirect } from "react-router-dom";
import { editContact } from "../../helpers/api";
import { useState } from "react";
import ContactForm from "../../ui/ContactForm";

export async function loader({ params }) {
  const res = await fetch(
    `https://contactbuddy-json-server-api.vercel.app/contacts/${params.id}`,
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

export async function action({ request }) {
  const formData = await request.formData();
  if (formData.get("favorite") === "on") {
    formData.set("favorite", true);
  }

  if (!formData.get("favorite")) {
    formData.append("favorite", false);
  }

  const payload = Object.fromEntries(formData);
  editContact(payload);
  return redirect("/");
}

function EditContact() {
  const user = useLoaderData();
  const [favorite, setFavorite] = useState(JSON.parse(user.favorite));

  return (
    <ContactForm
      action="Edit contact"
      favorite={favorite}
      setFavorite={setFavorite}
      user={user}
    />
  );
}

export default EditContact;
