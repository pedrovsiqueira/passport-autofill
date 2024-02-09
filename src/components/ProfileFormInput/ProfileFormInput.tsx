import { ChangeEvent, FC } from "react";
import "./styles.css";

interface ProfileFormInputProps {
  id: string;
  label: string;
  value: string | undefined;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const ProfileFormInput: FC<ProfileFormInputProps> = ({
  id,
  label,
  value,
  onChange,
}) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input type="text" id={id} value={value} onChange={onChange} />
    </div>
  );
};

export default ProfileFormInput;
