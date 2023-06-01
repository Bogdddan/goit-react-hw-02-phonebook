import React, { Component } from "react";
import css from '../ContactInput.module.css';
import { Filter } from "./Filter/Filter";
import ContactList from "./ContactList/ContactList";
import Form from "./Form/Form";

export class App extends Component {
  state = {
    contacts: [],
    name: '',
    number: '',
    filter: '',
  }

  handleSubmitForm = e => {
    e.preventDefault();

    const { name, number } = this.state;

    const isDuplicateName = this.state.contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase());

    if (isDuplicateName) {
      alert('Контакт з таким ім\'ям вже існує!');
      return;
    }

    const newContact = { id: Date.now(), name, number };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
      name: '',
      number: ''
    }));
  }

  handleDelete = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id)
    }));
  }

  handleInputChange = e => {
    const { name, value } = e.currentTarget;

    this.setState({
      [name]: value
    });
  }

  changeFilter = (e) => {
    this.setState({filter: e.currentTarget.value})
  }

  render() {
    const filterContacts = this.state.contacts.filter(contact => contact.name.toLowerCase().includes(this.state.filter.toLowerCase()));

    return (
      <div>
        <form className={css.form} onSubmit={this.handleSubmitForm}>
          <p>Name</p>
          <div className={css.qwerty}>
            <input
              type="text"
              value={this.state.name}
              onChange={this.handleInputChange}
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
            <p>Number</p>
            <input
              type="text"
              value={this.state.number}
              onChange={this.handleInputChange}
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
            <button type="submit">Add Contact</button>
          </div>
        </form>
        <Form  
        
        />

        <Filter 
          value={this.state.filter} 
          onChange={this.changeFilter}
        />
        <ContactList
          filterContacts={filterContacts}
          handleDelete={this.handleDelete}
        />
        
      </div>
    );
  }
}
