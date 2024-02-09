import { CSSProperties, FC } from "react";
import "./styles.css";

interface ButtonProps {
  text: string;
  className?: string;
  onClick?: () => void;
  style?: CSSProperties;
}

const Button: FC<ButtonProps> = ({ text, className = "", onClick, style }) => (
  <button
    style={style}
    onClick={onClick}
    type="button"
    className={`button ${className}`}
  >
    {text}
  </button>
);

export default Button;
