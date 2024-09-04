import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import ContactDetails from "./features/ContactDetails/ContactDetails";
import Error404 from "./ui/Error404";
import { loader as contactsLoader } from "./ui/AppLayout";
import { loader as contactDetailsLoader } from "./features/ContactDetails/ContactDetails";
import CreateContact from "./features/CreateContact/CreateContact";
import { action as createContactAction } from "./features/CreateContact/CreateContact";
import EditContact from "./features/EditContact/EditContact";
import { loader as editContactLoader } from "./features/EditContact/EditContact";
import { action as editContactAction } from "./features/EditContact/EditContact";
import { action as deleteContactAction } from "./features/ContactDetails/ContactDetails";
import Home from "./ui/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    loader: contactsLoader,
    errorElement: <Error404 />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/contacts/:id",
        element: <ContactDetails />,
        loader: contactDetailsLoader,
      },
      {
        path: "/contacts/:id/delete",
        element: <AppLayout />,
        action: deleteContactAction,
        errorElement: <p>Oops something went wrong!</p>,
      },
      {
        path: "/contacts/new",
        element: <CreateContact />,
        action: createContactAction,
      },
      {
        path: "/contacts/:id/edit",
        element: <EditContact />,
        loader: editContactLoader,
        action: editContactAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
