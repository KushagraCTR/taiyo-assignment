import React, { useState } from "react";

interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  status: string;
}

interface ContactFormProps {
  feature: string;
  toUpdateContact: object;
  toggleCreateContact: () => void;
  settoUpdateContact: React.Dispatch<React.SetStateAction<Contact>>;
}

const ContactForm: React.FC<ContactFormProps> = ({
  feature,
  toUpdateContact,
  toggleCreateContact,
}) => {
  // console.log(toUpdateContact, "===============");
  const [id, setId] = useState((toUpdateContact as Contact)?.id);
  const [firstName, setFirstName] = useState(
    (toUpdateContact as Contact)?.firstName
  );
  const [lastName, setLastName] = useState(
    (toUpdateContact as Contact)?.lastName
  );
  const [status, setStatus] = useState((toUpdateContact as Contact)?.status);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const contactsString = localStorage.getItem("contacts");
    const contacts: Contact[] = contactsString
      ? JSON.parse(contactsString)
      : [];

    if (toUpdateContact) {
      const index = contacts.findIndex(
        (contact) => contact.id === (toUpdateContact as Contact)?.id
      );
      if (index !== -1) {
        const updatedContacts = [...contacts];
        updatedContacts[index] = {
          ...toUpdateContact,
          id,
          firstName,
          lastName,
          status,
        };
        localStorage.setItem("contacts", JSON.stringify(updatedContacts));
        console.log("Contact updated:", updatedContacts[index]);
      } else {
        // console.log("Contact not found for editing");
        const newContact: Contact = {
          id: contacts.length + 1,
          firstName,
          lastName,
          status,
        };
        const updatedContacts = [...contacts, newContact];
        localStorage.setItem("contacts", JSON.stringify(updatedContacts));
        console.log("New contact saved:", newContact);
      }
    } else {
      console.log("nav");
    }

    toggleCreateContact();
  };

  const handleCancel = () => {
    // Clear form fields
    setFirstName("");
    setLastName("");
    setStatus("");
    toggleCreateContact();
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-200 p-8 rounded-lg w-96">
        <h2 className="text-2xl mb-4">Contact Form</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="firstName" className="block mb-1">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              className="w-full p-2 border rounded-md"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block mb-1">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              className="w-full p-2 border rounded-md"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <span>Status:</span>
            <label className="ml-2">
              <input
                type="radio"
                value="active"
                checked={status === "active"}
                onChange={() => setStatus("active")}
              />
              Active
            </label>
            <label className="ml-4">
              <input
                type="radio"
                value="inactive"
                checked={status === "inactive"}
                onChange={() => setStatus("inactive")}
              />
              Inactive
            </label>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-purple-950 text-white px-4 py-2 rounded-md mr-2"
              onClick={handleSubmit}
            >
              {/* {typeof(toUpdateContact)} */}
              {toUpdateContact ? "Save Contact" : "Edit Contact"}
            </button>
            <button
              type="button"
              className="bg-red-500 text-white px-4 py-2 rounded-md"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
