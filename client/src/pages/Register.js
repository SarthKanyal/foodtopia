import { useState } from "react";
import { Logo, FormRow, Alert } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useAppContext } from "../context/appContext";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = () => {
  const { showAlert, displayAlert } = useAppContext();
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
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });

    return;
  };

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
          type="text"
          name="password"
          value={values.password}
          labelText="Password"
          handleChange={handleChange}
        />
        <button type="submit" className="btn btn-block">
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
