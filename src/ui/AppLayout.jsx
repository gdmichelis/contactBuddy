// import { useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLoaderData,
  Form,
  useNavigate,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import "./AppLayout.css";
import Logo from "../assets/ContactsBuddy Logo.png";
import Avatar from "../assets/user.png";
import { getContacts, searchContact } from "../helpers/api";
import { useEffect } from "react";
import Loader from "../ui/Loader";

export async function loader({ request }) {
  const url = new URL(request.url);
  if (url.search) {
    const q = url.searchParams.get("q");
    const contacts = await searchContact(q);
    return { contacts, q };
  } else {
    const contacts = await getContacts();
    return { contacts };
  }
}

function AppLayout() {
  const { contacts, q } = useLoaderData();
  const navigate = useNavigate();
  const submit = useSubmit();
  const navigation = useNavigation();
  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

  useEffect(() => {
    document.getElementById("q").value = q || "";
  }, [q]);

  const currentUrl = window.location.href;
  const isNewContactUrl = new URL(currentUrl);
  const pathName = isNewContactUrl.pathname;

  return (
    <div className="layout__wrapper">
      <header>
        <div>
          <Link to="/">
            <img src={Logo} alt="ContactBuddy Logo" />
          </Link>
        </div>
        <div className="header__right_area">
          <img src={Avatar} alt="User Image" />
          <span>Welcome, Georgios</span>
        </div>
      </header>

      <aside>
        <div className="form__container">
          <Form className="search_form" role="search">
            <input
              type="search"
              aria-label="Search contacts"
              id="q"
              name="q"
              defaultValue={q}
              placeholder=" &#x1F50D; Search..."
              onChange={(e) => {
                const isFirstSearch = q == null;
                submit(e.currentTarget.form, { replace: !isFirstSearch });
              }}
            />
            <div className="sr-only" aria-live="polite"></div>
          </Form>
        </div>
        <hr></hr>
        {searching ? (
          <Loader />
        ) : (
          <nav>
            {contacts.length > 0 ? (
              contacts.map((contact) => {
                return (
                  <li key={contact.id}>
                    <NavLink
                      to={`/contacts/${contact.id}`}
                      className={({ isActive, isPending }) => {
                        return isPending ? "pending" : isActive ? "active" : "";
                      }}
                    >
                      {contact.first_name} {contact.last_name}
                    </NavLink>
                  </li>
                );
              })
            ) : q !== undefined ? (
              <span>⚠ We didn&apos;t find anything!</span>
            ) : (
              <span>⚠ You haven&apos;t any contact yet!</span>
            )}
          </nav>
        )}

        <hr></hr>
        <span className="aside_footer">
          <img src={Logo} alt="ContactsBuddy Logo" />
        </span>
      </aside>

      <main>
        {!pathName.includes("/contacts/new") && !pathName.includes("/edit") ? (
          <div className="button__box">
            <button onClick={() => navigate("/contacts/new")} type="button">
              + Create contact
            </button>
          </div>
        ) : (
          ""
        )}
        <Outlet context={contacts} />
      </main>

      <footer>
        <div className="footer__left_area">
          <span>Copyright &copy; ContactBuddy {new Date().getFullYear()}</span>
        </div>
        <div className="footer__right_area"></div>
      </footer>
    </div>
  );
}

export default AppLayout;
