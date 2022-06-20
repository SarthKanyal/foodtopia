import { Logo } from "../components";
import groceries from "../assets/images/groceries2.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        {/* Info div */}
        <div className="info">
          <h1>
            Grocery <span>Barter</span> App
          </h1>
          <p>
            I'm baby scenester before they sold out microdosing, meggings raw
            denim la croix hella copper mug man braid 90's. Stumptown lomo
            wayfarers art party, ramps bespoke fixie glossier echo park.
          </p>
          <Link to="/register" className="btn btn-hero">
            Login/Register
          </Link>
        </div>
        <img src={groceries} alt="exchange" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
