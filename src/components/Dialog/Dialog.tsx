import { useState, FC, ChangeEvent } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ProfileFormState } from "../../types/types";
import AutofillButton from "../AutofillButton/AutofillButton";
import UploadButton from "../UploadButton/UploadButton";
import Button from "../Button/Button";

type DialogDemoProps = {
  onSubmit: (newFormData: ProfileFormState) => void;
  form: ProfileFormState;
};

const DialogDemo: FC<DialogDemoProps> = ({ onSubmit, form }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [ocrFormData, setOcrFormData] = useState<ProfileFormState>({
    firstName: "",
    lastName: "",
    passportNumber: "",
  });
  const [selectedFields, setSelectedFields] = useState<{
    [key in keyof ProfileFormState]?: boolean;
  }>({});

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const formData = new FormData();
      formData.append("file", event.target.files[0]);

      const response = await fetch("/ocr", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const { firstName, lastName, passportNumber } = await response.json();
        setOcrFormData({
          firstName,
          lastName,
          passportNumber,
        });
        setCurrentStep(2);
      }
    }
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    if (name in ocrFormData) {
      setSelectedFields({
        ...selectedFields,
        [name as keyof ProfileFormState]: checked,
      });
    }
  };

  const handleConfirmAutofill = () => {
    const updatedFormData: ProfileFormState = { ...form };

    Object.keys(selectedFields).forEach((key) => {
      if (selectedFields[key as keyof ProfileFormState]) {
        updatedFormData[key as keyof ProfileFormState] =
          ocrFormData[key as keyof ProfileFormState] || "";
      }
    });

    onSubmit(updatedFormData);
    handleCancel();
  };

  const handleCancel = () => {
    setSelectedFields({});
    setOcrFormData({ firstName: "", lastName: "", passportNumber: "" });
    setCurrentStep(1);
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <AutofillButton />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        {currentStep === 1 && (
          <Dialog.Content className="DialogContent">
            <Dialog.Title className="DialogTitle">
              Step 1: Upload Passport
            </Dialog.Title>

            <UploadButton handleFileUpload={handleFileUpload} />
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
              <Dialog.Close asChild>
                <Button
                  style={{ width: "100%" }}
                  text="Cancel"
                  onClick={handleCancel}
                />
              </Dialog.Close>
            </div>
          </Dialog.Content>
        )}

        {currentStep === 2 && (
          <Dialog.Content className="DialogContent">
            <Dialog.Title className="DialogTitle">
              Step 2: Confirm Autofill
            </Dialog.Title>
            <div className="dialog-form-container">
              <p>Please select the fields you would like to autofill</p>
              <form>
                {Object.entries(ocrFormData).map(([key, value]) => (
                  <label key={key}>
                    <input
                      type="checkbox"
                      name={key}
                      checked={!!selectedFields[key as keyof ProfileFormState]}
                      onChange={handleCheckboxChange}
                    />
                    {`${key.charAt(0).toUpperCase() + key.slice(1)} (${value})`}
                  </label>
                ))}
              </form>
            </div>
            <div className="dialog-buttons-container">
              <Dialog.Close asChild>
                <Button text="Cancel" onClick={handleCancel} />
              </Dialog.Close>
              <Dialog.Close asChild>
                <Button
                  text="Confirm"
                  className="button-primary"
                  onClick={handleConfirmAutofill}
                />
              </Dialog.Close>
            </div>
          </Dialog.Content>
        )}
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DialogDemo;
