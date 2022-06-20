import styled from "styled-components";

const Wrapper = styled.section`
  display: grid;
  align-items: center;
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
  .form {
    max-width: 400px;
    border-top: 4px solid var(--primary-500);
    border-bottom: 4px solid var(--primary-500);
  }

  h3 {
    text-align: center;
    color: var(--primary-800);
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  .btn {
    margin-top: 1rem;
    margin-bottom: 0.5rem;
  }
  .member-btn {
    background: transparent;
    border: transparent;
    color: var(--primary-800);
    cursor: pointer;
    letter-spacing: var(--letterSpacing);
  }
  a {
    color: var(--primary-500);
    text-decoration: underline;
    text-transform: capitalize;
  }
`;
export default Wrapper;
