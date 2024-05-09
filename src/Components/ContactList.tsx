import React, { useEffect, useState } from "react";
import ContactForm from "./ContactForm";

interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  status: string;
}

interface ContactListProps {
  toggleCreateContact: () => void;
  toUpdateContact: object;
  createContact: boolean;
  settoUpdateContact: React.Dispatch<React.SetStateAction<Contact>>;
}

const ContactList: React.FC<ContactListProps> = ({
  createContact,
  toUpdateContact,
  toggleCreateContact,
  settoUpdateContact,
}) => {
  // const [contacts, setContacts] = useState<Contact[]>([
  //   { id: 1, firstName: "John", lastName: "Doe", status: "active" },
  //   { id: 2, firstName: "Jane", lastName: "Smith", status: "inactive" },
  //   { id: 3, firstName: "Michael", lastName: "Johnson", status: "active" },
  //   { id: 4, firstName: "John", lastName: "Doe", status: "active" },
  //   { id: 5, firstName: "Jane", lastName: "Smith", status: "inactive" },
  //   { id: 6, firstName: "Michael", lastName: "Johnson", status: "active" },
  //   { id: 7, firstName: "John", lastName: "Doe", status: "active" },
  //   { id: 8, firstName: "Jane", lastName: "Smith", status: "inactive" },
  //   { id: 9, firstName: "Michael", lastName: "Johnson", status: "active" },
  //   { id: 10, firstName: "John", lastName: "Doe", status: "active" },
  //   { id: 11, firstName: "Jane", lastName: "Smith", status: "inactive" },
  //   { id: 12, firstName: "Michael", lastName: "Johnson", status: "active" },
  //   { id: 13, firstName: "John", lastName: "Doe", status: "active" },
  //   { id: 14, firstName: "Jane", lastName: "Smith", status: "inactive" },
  //   // { id: 15, firstName: "Michael", lastName: "Johnson", status: "active" },
  //   // { id: 16, firstName: "John", lastName: "Doe", status: "active" },
  //   // { id: 17, firstName: "Jane", lastName: "Smith", status: "inactive" },
  //   // { id: 18, firstName: "Michael", lastName: "Johnson", status: "active" },
  //   // { id: 19, firstName: "John", lastName: "Doe", status: "active" },
  //   // { id: 20, firstName: "Jane", lastName: "Smith", status: "inactive" },
  //   // { id: 21, firstName: "Michael", lastName: "Johnson", status: "active" },
  //   // { id: 22, firstName: "John", lastName: "Doe", status: "active" },
  //   // { id: 23, firstName: "Jane", lastName: "Smith", status: "inactive" },
  //   // { id: 24, firstName: "Michael", lastName: "Johnson", status: "active" },
  //   // { id: 25, firstName: "John", lastName: "Doe", status: "active" },
  //   // { id: 26, firstName: "Jane", lastName: "Smith", status: "inactive" },
  //   // { id: 27, firstName: "Michael", lastName: "Johnson", status: "active" },
  //   // { id: 28, firstName: "Michael", lastName: "Johnson", status: "active" },
  // ]);

  const [contacts, setContacts] = useState<Contact[]>([]);

  // useEffect to fetch contacts from localStorage on component mount
  useEffect(() => {
    // Fetch contacts array from localStorage
    const contactsString = localStorage.getItem("contacts");
    if (contactsString) {
      const parsedContacts: Contact[] = JSON.parse(contactsString);
      // console.log(parsedContacts);
      setContacts(parsedContacts);
    }
  }, []);


  const handleEdit = (id: number) => {
    // Implement edit logic here
    console.log("Edit contact with ID:", id);

    const contactsString = localStorage.getItem("contacts");

    if (contactsString) {
      const parsedContacts: Contact[] = JSON.parse(contactsString);
      const contactToUpdate = parsedContacts.find(
        (contact) => contact.id === id
      );
      if (contactToUpdate) {
        // Set the state with the details of the contact to update
        settoUpdateContact(contactToUpdate);
        // Optionally, you can close any create contact form if open
        toggleCreateContact();
      } else {
        console.log("Contact not found with ID:", id);
      }
    }

    const contactToUpdate = contacts.find((contact) => contact.id === id);
    console.log(contactToUpdate);
    if (contactToUpdate) {
      // Set the state with the details of the contact to update
      settoUpdateContact(contactToUpdate);
    }

    toggleCreateContact();
  };

  const handleDelete = (id: number) => {
    const contactsString = localStorage.getItem("contacts");
    if (contactsString) {
      const contacts: Contact[] = JSON.parse(contactsString);
      const updatedContacts = contacts.filter((contact) => contact.id !== id);

      updatedContacts.sort((a, b) => a.id - b.id);
      for (let i = 0; i < updatedContacts.length; i++) {
        updatedContacts[i].id = i + 1;
      }
      localStorage.setItem("contacts", JSON.stringify(updatedContacts));

      setContacts(updatedContacts);

      console.log("Delete contact with ID:", id);
    } else {
      console.log("No contacts found in localStorage");
    }
  };

  return (
    <div className="flex flex-col items-center mx-3 my-10">
      {/* Create Contact button */}
      <button
        className="bg-purple-950 text-white px-4 py-2 rounded-md mb-4"
        onClick={() => {
          toggleCreateContact();
          // setShowForm(!showForm);
          settoUpdateContact({
            id: 0,
            firstName: "",
            lastName: "",
            status: "",
          });
        }}
      >
        {!createContact && "Create Contact"}
      </button>

      {/* Contact form */}
      {createContact && (
        <ContactForm
          feature={"kk"}
          toggleCreateContact={toggleCreateContact}
          toUpdateContact={toUpdateContact}
          settoUpdateContact={settoUpdateContact}
        />
      )}

      {/* Contact list */}
      <div className=" flex justify-end  flex-wrap my-6">
        {contacts?.length === 0 && (
          <div>
            <h1>No contact found Please add contact from Create Button</h1>
          </div>
        )}
        {contacts?.map((contact) => (
          <div
            key={contact.id}
            className=" flex-col justify-center border rounded-md p-2 mb-2 mx-9 w-80"
          >
            <div>
              <span className="font-bold">First Name:</span> {contact.firstName}
            </div>
            <div>
              <span className="font-bold">Last Name:</span> {contact.lastName}
            </div>
            <div>
              <span className="font-bold">Status:</span> {contact.status}
            </div>
            <div className="mt-2 w-15">
              <button
                className="bg-purple-950 text-white px-7 py-1 rounded-md mr-2"
                onClick={() => {
                  handleEdit(contact.id);
                }}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded-md"
                onClick={() => {
                  handleDelete(contact.id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactList;
