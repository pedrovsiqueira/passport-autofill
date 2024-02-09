import { FC } from "react";
import "./styles.css";
import { magicWandIcon } from "../../assets/icons";

interface AutofillButtonProps {
  onClick?: () => void;
}

const AutofillButton: FC<AutofillButtonProps> = ({ onClick }) => (
  <button className="autofill-button" onClick={onClick}>
    <img src={magicWandIcon} alt="Magic Wand" />
    Autofill with Passport
  </button>
);

export default AutofillButton;
