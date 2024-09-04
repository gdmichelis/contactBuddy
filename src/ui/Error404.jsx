import { useRouteError, Link } from "react-router-dom";
import "./Error404.css";

function Error404() {
  const error = useRouteError();

  return (
    <div className="error__container">
      <Link to="/">&larr; back</Link>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occured.</p>
      <p>
        <i> {error.statusText || error.message}</i>
      </p>
    </div>
  );
}

export default Error404;
