import React, { Component } from "react";
import css from "../ContactInput.module.css";
import { Filter } from "./Filter/Filter";
import ContactList from "./ContactList/ContactList";
import Form from "./Form/Form";

export class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };

  handleSubmitForm = (name, number) => {
    const isDuplicateName = this.state.contacts.some(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isDuplicateName) {
      alert("Контакт з таким ім'ям вже існує!");
      return;
    }

    const newContact = { id: Date.now(), name, number };

    this.setState((prevState) => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  handleDelete = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== id),
    }));
  };

  changeFilter = (e) => {
    this.setState({ filter: e.currentTarget.value });
  };

  render() {
    const { filter, contacts } = this.state;
    const filterContacts = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div className={css.container}>
        <Form handleSubmitForm={this.handleSubmitForm} />

        <Filter value={filter} onChange={this.changeFilter} />

        <ContactList
          filterContacts={filterContacts}
          handleDelete={this.handleDelete}
        />
      </div>
    );
  }
}
