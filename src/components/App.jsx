import React from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import PropTypes from 'prop-types';

export class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  handleDelete = contactId => {
    this.setState(prevState => {
      const updatedContacts = prevState.contacts.filter(
        contact => contact.id !== contactId
      );
      return { contacts: updatedContacts };
    });
  };

  handleAddContact = (name, number) => {
    const { contacts } = this.state;

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

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  handleFilterChange = event => {
    this.setState({ filter: event.target.value });
  };

  render() {
    const { contacts, filter } = this.state;

    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div>
        <h1>Phonеbook</h1>

        <ContactForm onAddContact={this.handleAddContact} />

        <h2>Contacts</h2>

        <Filter filter={filter} onChange={this.handleFilterChange} />

        <ContactList contacts={filteredContacts} onDelete={this.handleDelete} />
      </div>
    );
  }
}

App.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  filter: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleAddContact: PropTypes.func.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
  
};
