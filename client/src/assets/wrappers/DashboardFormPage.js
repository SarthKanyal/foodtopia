import styled from "styled-components";

const Wrapper = styled.section`
  border-radius: var(--borderRadius);
  width: 100%;
  background: #e6ffe6;
  padding: 3rem 2rem 4rem;
  box-shadow: var(--shadow-2);
  h3 {
    margin-top: 0;
    font-weight: 600;
  }
  .icon {
    font-size: 1rem;
    margin-left: 0.5rem;
  }
  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
    background: #e6ffe6;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;

    row-gap: 1.5rem;
  }
  .form-center button {
    align-self: end;
    height: 35px;
    margin-top: 1rem;
  }
  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 0.5rem;
    align-self: flex-end;
    margin-top: 0.5rem;
    button {
      height: 35px;
    }
  }
  .donate-btn {
    color: #570861;
    background: #cbc3e3;
  }
  .donate-btn:hover {
    background: #ffc0cb;
  }
  .clear-btn {
    background: var(--grey-500);
  }
  .clear-btn:hover {
    background: var(--black);
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1rem;
    }
    .btn-container {
      margin-top: 0;
    }
  }
  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .form-center button {
      margin-top: 0;
    }
  }
`;

export default Wrapper;
