import React, { useState } from "react";
import SideMenu from "../Components/SideMenu";
import ContactList from "../Components/ContactList";
import ContactForm from "../Components/ContactForm";

interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  status: string;
}
function Contact() {
  const [showSideBar, setShowSideBar] = useState(true);
  // const [active, setActive] = useState("discussion");
  const [createContact, setcreateContact] = useState(false);
  const [toUpdateContact, settoUpdateContact] = useState<Contact>({
    id: 0,
    firstName: "",
    lastName: "",
    status: "",
  });

  const toggleSideBar = () => {
    setShowSideBar(!showSideBar);
  };

  const toggleCreateContact = () => {
    setcreateContact(!createContact);
  };
  return (
    <div>
      <SideMenu showSideBar={showSideBar} toggleSideBar={toggleSideBar} />
      {!createContact ? (
        <ContactList
          toggleCreateContact={toggleCreateContact}
          createContact={createContact}
          toUpdateContact={toUpdateContact}
          settoUpdateContact={settoUpdateContact}
        />
      ) : (
        <ContactForm
        toggleCreateContact={toggleCreateContact}
          feature={"kk"}
          toUpdateContact={toUpdateContact}
          settoUpdateContact={settoUpdateContact}
        />
      )}
    </div>
  );
}

export default Contact;
