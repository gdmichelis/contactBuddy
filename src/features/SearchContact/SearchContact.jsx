import { searchContact } from "../../helpers/api";
import { useLoaderData, Form, useNavigate } from "react-router-dom";
import Star from "../../ui/Star";

export async function loader({ params }) {
  const data = await searchContact(params.searchText);
  return data;
}

function SearchContact() {
  const data = useLoaderData();
  const contact = data[0];
  const navigate = useNavigate();

  if (!contact) return <p>Sorry! We couldn&apos;t find anything!</p>;

  return (
    <div className="contact__details_container">
      <div className="image__wrapper">
        <img
          key={contact.avatar}
          src={
            contact.avatar ||
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
          <Star favorite={contact.favorite} />
        </div>
        <p>{contact.notes}</p>
        <p> Your contact since: {contact.createdAt}</p>
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
    </div>
  );
}

export default SearchContact;
