import "./Home.css";
import buttonImage from "../../src/assets/create_contact_button_v1.png";

function Home() {
  return (
    <div className="home__container">
      <h2>All Your Contacts in One Place!</h2>
      <p>
        Here you can store and manage all your contacts, in a fun and creative
        way!
      </p>
      <p>Create your contacts, by clicking the upper right button!</p>
      <img src={buttonImage} alt="Create Contact Button" />
    </div>
  );
}

export default Home;
