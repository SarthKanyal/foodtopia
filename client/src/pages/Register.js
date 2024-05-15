import { useState } from "react";
import { Logo, FormRow, Alert } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = () => {
  const navigate = useNavigate();
  const { user, isLoading, showAlert, displayAlert, setupUser } =
    useAppContext();
  const [values, setValues] = useState(initialState);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    /* If submit doesn't work as expected then default action is not to be taken */

    e.preventDefault();
    const { name, email, password, isMember } = values;

    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }
    const currentUser = { name, email, password };

    if (isMember) {
      const endpoint = "login";
      const alertText = "Login successful! Redirecting to Dashboard...";
      setupUser({ currentUser, endpoint, alertText });
    } else {
      const endpoint = "register";
      const alertText =
        "Account created successfully! Redirecting to Dashboard...";
      setupUser({ currentUser, endpoint, alertText });
    }
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });

    return;
  };

  useEffect(() => {
    if (user) {
      console.log("use effect called");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />

        <h3>
          <b>{values.isMember ? "Login" : "Register"}</b>
        </h3>

        {showAlert && <Alert />}

        {/*Name,Email,Password field*/}

        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            labelText="Name"
            handleChange={handleChange}
          />
        )}
        <FormRow
          type="text"
          name="email"
          value={values.email}
          labelText="Email"
          handleChange={handleChange}
        />
        <FormRow
          type="password"
          name="password"
          value={values.password}
          labelText="Password"
          handleChange={handleChange}
        />
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          Submit
        </button>

        <div>
          {values.isMember
            ? "Don't have an account?"
            : "Already have an account?"}
          <button type="button" className="member-btn" onClick={toggleMember}>
            <b>
              <u>{values.isMember ? "Register" : "Login"}</u>
            </b>
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
export default Register;
