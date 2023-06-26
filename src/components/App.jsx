import React from "react";
import { nanoid } from "nanoid";

export class App extends React.Component {
  state = {
    contacts: [],
    name: "",
    number: "",
    filter: ""
  };

  handleDelete = contactId => {
    this.setState(prevState => {
      const updatedContacts = prevState.contacts.filter(
        contact => contact.id !== contactId
      );
      return { contacts: updatedContacts };
    });
  };

  hendelInput = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { name, number, contacts } = this.state;

    if (name.trim() === "" || number.trim() === "") {
      // Проверка на пустые поля
      return;
    }

    const existingContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (existingContact) {
      // Если контакт с таким именем уже существует, выводим предупреждение
      alert("Контакт с таким именем уже существует!");
      return;
    }

    const newContact = {
      id: nanoid(), // Генерация уникального идентификатора
      name,
      number
    };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
      name: "",
      number: ""
    }));
  };

  handleFilterChange = event => {
    this.setState({ filter: event.target.value });
  };

  render() {
    const { filter, contacts } = this.state;

    // Фильтрация контактов по имени
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div>
        
        <form onSubmit={this.handleSubmit}>
          <div>
            <h2>Name</h2>
            <input
              onChange={this.hendelInput}
              value={this.state.name}
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
              onChange={this.hendelInput}
              value={this.state.number}
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
          </div>
          <button>Add number</button>
        </form>
        <div>
          <h2>Contacts</h2>
          <input
          type="text"
          placeholder="Search by name"
          value={filter}
          onChange={this.handleFilterChange}
        />
          <ul>
            {filteredContacts.map(contact => (
              <li key={contact.id}>
                {contact.name}: {contact.number}
                <button onClick={() => this.handleDelete(contact.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
