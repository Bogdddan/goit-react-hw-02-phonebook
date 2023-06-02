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
    const { name, number, filter, contacts } = this.state;
    const filterContacts = contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()));

    return (
      <div className={css.container}>
        <Form
          name={name}
          number={number}
          handleInputChange={this.handleInputChange}
          handleSubmitForm={this.handleSubmitForm}
        />

        <Filter
          value={filter}
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
