import Tippy from "@tippyjs/react";

const InfoTippy = ({ element }, { content }) => {
  return <Tippy content={content}>{element}</Tippy>;
};
export default InfoTippy;
