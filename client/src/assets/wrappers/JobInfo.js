import styled from "styled-components";

const Wrapper = styled.div`
  margin-top: 0.5rem;
  display: flex;
  align-items: center;

  .icon {
    font-size: 1.5rem;
    margin-right: 1rem;
    display: flex;
    align-items: center;
    svg {
      color: var(--grey-700);
    }
  }
  .text {
    text-transform: lowercase;
    letter-spacing: var(--letterSpacing);
  }
  .date {
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
  }
`;
export default Wrapper;
