import React from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useEffect } from 'react';

export const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  const handleDelete = contactId => {
    const updatedContacts = contacts.filter(
      contact => contact.id !== contactId
    );
    return setContacts(updatedContacts);
  };

  const handleAddContact = (name, number) => {
    const existingContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
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

    setContacts(prevState => [...prevState, newContact]);
  };

  const handleFilterChange = event => {
    setFilter(event.target.value);
  };

  useEffect(() => {
    const savedStringifiedContacts = localStorage.getItem('contacts');
    const contacts = JSON.parse(savedStringifiedContacts) ?? [];
    setContacts(contacts);
  }, []);

  useEffect(() => {
    const savedStringifiedContacts = JSON.stringify(contacts);
    localStorage.setItem('contacts', savedStringifiedContacts);
  }, [contacts]);

  // useEffect(() => {
  //   const storedState = localStorage.getItem('phonebookState')
  //   if (storedState) {
  //      setContacts(JSON.parse(storedState));
  //   }
  // },[])
  // useEffect(() =>{

  //      localStorage.setItem('phonebookState', JSON.stringify(contacts));

  // },[contacts])

  const filteredContacts = contacts.filter(contact =>
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
  // filter: PropTypes.string.isRequired,
  // handleDelete: PropTypes.func.isRequired,
  // handleAddContact: PropTypes.func.isRequired,
  // handleFilterChange: PropTypes.func.isRequired,
};
