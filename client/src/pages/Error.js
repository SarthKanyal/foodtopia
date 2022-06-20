import Wrapper from "../assets/wrappers/ErrorPage";
import { Link } from "react-router-dom";
import errorImg from "../assets/images/my-not-found.svg";

const Error = () => {
  return (
    <Wrapper className="full-page">
      <div>
        <img src={errorImg} alt="Error 404" />
        <h3>Sorry!</h3>
        <p>The page you're looking for could not be found</p>
        <Link to="/">Back to Home</Link>
      </div>
    </Wrapper>
  );
};
export default Error;
