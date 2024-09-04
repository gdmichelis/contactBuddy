import "./ContactDetails.css";
import Star from "../../ui/Star";
import {
  Form,
  useLoaderData,
  useNavigate,
  redirect,
  useNavigation,
} from "react-router-dom";
import { deleteContact } from "../../helpers/api";
import { getContact } from "../../helpers/api";
import Loader from "../../ui/Loader";

export async function loader({ params }) {
  const contactId = params.id;
  const contact = await getContact(contactId);
  return contact;
}

export async function action({ request }) {
  const confirmMessage = confirm(
    "Are you sure you want to delete this contact?"
  );
  if (!confirmMessage) return redirect("/");
  const formData = await request.formData();
  const payload = Object.fromEntries(formData);
  deleteContact(payload["contact_id"]);
  return redirect("/");
}

function ContactDetails() {
  const navigate = useNavigate();
  const contact = useLoaderData();
  const navigation = useNavigation();

  return (
    <div className="contact__details_container">
      {navigation.state === "loading" ? (
        <Loader />
      ) : (
        <>
          {" "}
          <div className="image__wrapper">
            <img
              key={contact.avatar}
              src={
                contact?.avatar ||
                `https://robohash.org/${contact.id}.png?set=set5&size=150x150`
              }
              alt="Contact User Image"
            />
          </div>
          <div className="content__wrapper">
            <div className="content__box">
              <h3>
                {contact.first_name || contact.last_name ? (
                  <>
                    {contact.first_name} {contact.last_name}
                  </>
                ) : (
                  <i>No Name</i>
                )}
              </h3>
              <Star favorite={JSON.parse(contact.favorite)} />
            </div>
            <p>{contact?.notes}</p>
            <em>
              {" "}
              Your contact since: <strong>{contact.createdAt}</strong>
            </em>
            <div className="buttons__group">
              <div>
                <button
                  type="button"
                  onClick={() => navigate(`/contacts/${contact.id}/edit`)}
                >
                  Edit
                </button>
              </div>
              <Form method="DELETE" action={`/contacts/${contact.id}/delete`}>
                <input type="hidden" name="contact_id" value={contact.id} />
                <button type="submit">Delete</button>
              </Form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ContactDetails;
