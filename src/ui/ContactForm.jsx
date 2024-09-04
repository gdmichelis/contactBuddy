import "./ContactForm.css";
import { useNavigate, Form } from "react-router-dom";

function ContactForm({ action, user, favorite, setFavorite }) {
  const navigate = useNavigate();
  return (
    <div className="contact-form-container">
      <h2>{action}</h2>
      <div>
        <Form
          method="POST"
          className="contact-form-form-outer"
          aria-label={`${action}`}
        >
          {/* Form body */}
          <div className="contact-form-form-body">
            <div className="contact-form-input-container">
              <div className="title-box">
                <label htmlFor="first_name">Fisrt Name</label>
                <input
                  className="contact-form-input"
                  type="text"
                  id="first_name"
                  name="first_name"
                  defaultValue={user?.first_name}
                />
              </div>
              <div className="image-box">
                <label htmlFor="last_name">Last Name</label>
                <input
                  className="contact-form-input"
                  type="text"
                  id="last_name"
                  name="last_name"
                  defaultValue={user?.last_name}
                />
              </div>
            </div>

            <div className="contact-form-input-container">
              <input type="hidden" name="id" value={user?.id} />
              <input
                type="hidden"
                name="createdAt"
                value={
                  user?.createdAt
                    ? user.createdAt
                    : new Date().toISOString().slice(0, 10)
                }
              />
              <input
                type="hidden"
                name="avatar"
                value={`https://robohash.org/you.png?set=set5&size=150x150`}
              />
              <div className="duration-box">
                <label htmlFor="favorite">Favorite</label>
                <input
                  id="favorite"
                  type="checkbox"
                  name="favorite"
                  defaultChecked={favorite}
                  onClick={() => {
                    setFavorite(!favorite);
                  }}
                />
              </div>
            </div>

            <div className="contact-form-input-container">
              <div className="rating-box">
                <label htmlFor="notes">Notes</label>
                <textarea
                  className="contact-form-input"
                  id="notes"
                  name="notes"
                  defaultValue={user?.notes || ""}
                />
              </div>
            </div>
          </div>
          {/* Form footer*/}
          <div className="contact-form-form-footer">
            <button onClick={() => navigate("/")} type="button">
              Cancel
            </button>
            <button type="submit">Save</button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default ContactForm;
