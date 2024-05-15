import styled from "styled-components";

const Wrapper = styled.article`
  background: #e6ffe6;
  border-radius: var(--borderRadius);
  display: grid;
  grid-template-rows: 1fr auto;
  box-shadow: var(--shadow-2);

  .header {
    background: #93d976;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--grey-100);
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;

    h5 {
      letter-spacing: 0;
    }
  }
  .warningHeader {
    background: #e38580;
  }

  .cautionHeader {
    background: #ffc39a;
  }
  .main-icon {
    width: 60px;
    height: 60px;
    display: grid;
    place-items: center;
    background: var(--primary-500);
    border-radius: var(--borderRadius);
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #e6ffe6;
    margin-right: 2rem;
  }
  .info {
    h5 {
      margin-bottom: 0.25rem;
      //color: var(--primary-success);
    }
    p {
      margin: 0;
      text-transform: capitalize;
      color: var(--primary-800);
      letter-spacing: var(--letterSpacing);
    }
  }
  .pending {
    background: #fcefc7;
    color: #e9b949;
  }
  .interview {
    background: #e0e8f9;
    color: #647acb;
  }
  .declined {
    color: #d66a6a;
    background: #ffeeee;
  }
  .content {
    padding: 1rem 1.5rem;
  }
  .content-center {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.5rem;
    @media (min-width: 576px) {
      grid-template-columns: 1fr 1fr;
    }
    @media (min-width: 992px) {
      grid-template-columns: 1fr;
    }
    @media (min-width: 1120px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  .status {
    border-radius: var(--borderRadius);
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    text-align: center;
    width: 100px;
    height: 30px;
  }
  footer {
    margin-top: 1rem;
  }
  .donate-btn,
  .edit-btn,
  .delete-btn {
    letter-spacing: var(--letterSpacing);
    cursor: pointer;
    height: 30px;
  }
  .edit-btn {
    color: var(--green-dark);
    //background: var(--green-light);
    background: #ffffbf;
    margin-right: 0.5rem;
  }
  .donate-btn {
    color: #570861;
    background: #cbc3e3;
  }
  .delete-btn {
    color: var(--red-dark);
    background: var(--red-light);
  }
  .claim-btn {
    color: #003060;
    background: #add8e6;
    margin-right: 0.5rem;
  }
  .pickup-btn {
    background: #fff171;
    color: #ad6f69;
  }
  .tippy-tooltip.tomato-theme {
    background-color: tomato;
    color: yellow;
  }
  .pickup {
    color: #93d976;
  }
  &:hover .actions {
    visibility: visible;
  }
`;

export default Wrapper;
