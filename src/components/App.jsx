import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import PropTypes from 'prop-types';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const handleDelete = (contactId) => {
    const updatedContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );
    setContacts(updatedContacts);
  };

  const handleAddContact = (name, number) => {
    const existingContact = contacts.find(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (existingContact) {
      alert('Контакт с таким именем уже существует!');
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts((prevContacts) => [...prevContacts, newContact]);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1>Phonеbook</h1>

      <ContactForm onAddContact={handleAddContact} />

      <h2>Contacts</h2>

      <Filter filter={filter} onChange={handleFilterChange} />

      <ContactList contacts={filteredContacts} onDelete={handleDelete} />
    </div>
  );
};

App.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),

  handleDelete: PropTypes.func.isRequired,
  handleAddContact: PropTypes.func.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
};
