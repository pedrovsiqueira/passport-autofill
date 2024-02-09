import { ChangeEvent, FC, useRef } from "react";
import "./styles.css";
import { uploadIcon } from "../../assets/icons";

interface UploadButtonProps {
  handleFileUpload: (event: ChangeEvent<HTMLInputElement>) => void;
}

const UploadButton: FC<UploadButtonProps> = ({ handleFileUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="upload-button" onClick={triggerFileInput}>
      <div className="upload-icon">
        <img src={uploadIcon} alt="Passport Icon" />
      </div>
      <div className="upload-text">Upload File</div>
      <input ref={fileInputRef} type="file" onChange={handleFileUpload} />
    </div>
  );
};

export default UploadButton;
