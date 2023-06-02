// Form.js
import React, { Component } from "react";
import css from "./Form.module.css";

class Form extends Component {
  state = {
    name: "",
    number: "",
  };

  handleInputChange = (e) => {
    const { name, value } = e.currentTarget;

    this.setState({
      [name]: value,
    });
  };

  handleSubmitForm = (e) => {
    e.preventDefault();

    const { name, number } = this.state;

    // Виклик функції зовнішнього компонента для обробки подання форми
    this.props.handleSubmitForm(name, number);

    // Очищення полів форми
    this.setState({
      name: "",
      number: "",
    });
  };

  render() {
    const { name, number } = this.state;

    return (
      <form className={css.form} onSubmit={this.handleSubmitForm}>
        <p>Name</p>
        <div className={css.qwerty}>
          <input
            type="text"
            value={name}
            onChange={this.handleInputChange}
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
          <p>Number</p>
          <input
            type="text"
            value={number}
            onChange={this.handleInputChange}
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
          <button type="submit">Add Contact</button>
        </div>
      </form>
    );
  }
}

export default Form;
