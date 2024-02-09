/**
 * Ticket #: AAA-8888
 *
 * Description
 * --
 * In this ticket, we will create a form with 4 fields: "First name", "Last name",
 * "Passport number", "Birth date".  There will also be a button called "Autofill with Passport"
 * that will allow users to upload their passport.  Uploading a passport will cause the form to
 *  autofill with data extraction from the document using OCR
 *
 * See mockup here: https://www.figma.com/file/c4r34De1U2GNU9OSyw4Npn/Autofill-with-Passport-Interview-Question?type=design&node-id=0%3A1&mode=design&t=dOdpzAZxfV0NxIwl-1
 *
 * Acceptance Criteria
 * --
 * 1. A form is created with 4 fields: "First name", "Last name", "Passport number", "Birth date".
 * 2. A button is added called "Autofill with Passport" that will allow users to upload
 *    their passport.
 * 3. Clicking this button will open a dialog box that will allow users to upload their passport.
 * 4. After the passport is uploaded, the dialog should proceed to "Step 2" where the user confirms
 *    which fields should be autofilled.
 * 5. Clicking "Confirm" should close the dialog and the form should autofill with the fields the user
 *    selected.
 *
 * Technical Notes
 * --
 * 1. `@radix-ui/react-dialog` is pre-installed.  You can use this to build the dialog, or you can install your own library.  We've also added basic styling for the dialog already in App.css
 * 2. We should _not_ use a component library for any other components
 * 3. The OCR api can be called by making a POST request to /ocr.  See "ocr-server.js" for more details
 * 4. Let's leave styling/css for the end if we have time.
 *
 */
import { ChangeEvent, useState } from "react";
import "./App.css";
import DialogDemo from "./components/Dialog/Dialog";
import { ProfileFormState } from "./types/types";
import ProfileFormInput from "./components/ProfileFormInput/ProfileFormInput";

function App() {
  const [formData, setFormData] = useState<ProfileFormState>({
    firstName: "",
    lastName: "",
    passportNumber: "",
    birthDate: "",
  });

  const handleSubmit = (newFormData: ProfileFormState) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      ...newFormData,
    }));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  return (
    <>
      <form className="form-container">
        <div>
          <ProfileFormInput
            id="firstName"
            label="First Name"
            value={formData.firstName}
            onChange={handleChange}
          />
          <ProfileFormInput
            id="lastName"
            label="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <ProfileFormInput
            id="passportNumber"
            label="Passport Number"
            value={formData.passportNumber}
            onChange={handleChange}
          />
          <ProfileFormInput
            id="birthDate"
            label="Birth Date"
            value={formData.birthDate}
            onChange={handleChange}
          />
        </div>
      </form>

      <DialogDemo onSubmit={handleSubmit} form={formData} />
    </>
  );
}

export default App;
