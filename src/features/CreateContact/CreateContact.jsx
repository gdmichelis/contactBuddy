import { redirect } from "react-router-dom";
import { createContact } from "../../helpers/api";
import ContactForm from "../../ui/ContactForm";

export async function action({ request }) {
  const formData = await request.formData();
  if (!formData.get("first_name") && !formData.get("last_name")) {
    alert("You must specify at least first name or last name!");
    return null;
  }

  if (!formData.get("favorite")) {
    formData.append("favorite", false);
  } else {
    formData.append("favorite", true);
  }

  const payload = Object.fromEntries(formData);
  createContact(payload);
  return redirect("/");
}

function CreateContact() {
  return <ContactForm action="Create a new contact" />;
}

export default CreateContact;
