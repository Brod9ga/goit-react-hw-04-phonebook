import React, { useState } from "react";
import { useEffect } from "react";

const ContactForm = ({ onAddContact }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    onAddContact(name, number);
    setName("");
    setNumber("");
  };
  useEffect(() => {
    const savedStringifiedContacts = localStorage.getItem('contacts');
    const savedContacts = JSON.parse(savedStringifiedContacts) ?? [];
    localStorage.setItem('contacts', JSON.stringify(savedContacts));
  }, []);
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h2>Name</h2>
        <input
          onChange={event => setName(event.target.value)}
          value={name}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </div>
      <div>
        <h2>Phone number</h2>
        <input
          onChange={event => setNumber(event.target.value)}
          value={number}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </div>
      <button>Add number</button>
    </form>
  );
};

export default ContactForm;
