import React from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import PropTypes from 'prop-types';

export class App extends React.Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
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

  componentDidMount() {
    const storedState = localStorage.getItem('phonebookState');

    if (storedState) {
      this.setState(JSON.parse(storedState));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      localStorage.setItem('phonebookState', JSON.stringify(this.state));
    }
  }
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
  // filter: PropTypes.string.isRequired,
  // handleDelete: PropTypes.func.isRequired,
  // handleAddContact: PropTypes.func.isRequired,
  // handleFilterChange: PropTypes.func.isRequired,
};
