import Wrapper from "../assets/wrappers/JobInfo";
const ItemInfo = ({ icon, text, date }) => {
  if (date) {
    return (
      <Wrapper>
        <span className="icon">{icon}</span>

        <span className="date">{date}</span>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <span className="icon">{icon}</span>
      <span className="text">{text}</span>
    </Wrapper>
  );
};
export default ItemInfo;
