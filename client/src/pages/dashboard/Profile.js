import { useState } from "react";
import { FormRow, Alert } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";

const Profile = () => {
  const { user, showAlert, displayAlert, isLoading, updateUser } =
    useAppContext();

  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [lastName, setLastName] = useState(user?.lastName);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !lastName) {
      displayAlert();
      return;
    }

    updateUser({ name, email, lastName });
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>Profile</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            type="text"
            value={name}
            name="name"
            labelText="Name"
            handleChange={(e) => setName(e.target.value)}
          />
          <FormRow
            type="text"
            value={lastName}
            labelText="Last Name"
            name="lastName"
            handleChange={(e) => setLastName(e.target.value)}
          />
          <FormRow
            type="email"
            value={email}
            name="email"
            labelText="Email"
            handleChange={(e) => setEmail(e.target.value)}
          />
          <div className="btn-container">
            <button
              className="btn btn-block"
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Please wait..." : "Save Changes"}
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};
export default Profile;
