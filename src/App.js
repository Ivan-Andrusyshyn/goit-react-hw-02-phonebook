// import PropTypes from "prop-types";
import { ContactList } from "./components/listContact/listContact";
import { ContactForm } from "./components/form/formContact";
import { Filter } from "./components/search/search";
import { nanoid } from "nanoid";
import React, { Component } from "react";
import css from "./app.module.css";

class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };
  filterHendler = () => {
    const { contacts, filter } = this.state;
    const normalFilter = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalFilter)
    );
  };
  searchFilter = ({ currentTarget }) => {
    this.setState({ filter: currentTarget.value });
  };
  formSubmitHandler = ({ name, number }) => {
    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };
    const filtredItem = this.tryCreateonSubm(newContact);
    if (filtredItem.length > 0) return;
    this.setState((prevState) => ({
      contacts: [newContact, ...prevState.contacts],
    }));
  };
  tryCreateonSubm = (newContact) => {
    const { contacts } = this.state;
    return contacts.filter(({ name }) => {
      const arrName = name.toLowerCase();
      const newNameCont = newContact.name.toLowerCase();
      if (arrName === newNameCont) {
        alert(`${name} is already in contacts`);
      }
      return arrName === newNameCont;
    });
  };
  onDeleteTodo = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== id),
    }));
  };
  render() {
    const { filter } = this.state;
    const { searchFilter, filterHendler, formSubmitHandler, onDeleteTodo } =
      this;
    const filterdCintacts = filterHendler();

    return (
      <div className={css.container}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={formSubmitHandler} />
        <Filter searchFilter={searchFilter} filter={filter} />
        <ContactList contacts={filterdCintacts} onDeleteTodo={onDeleteTodo} />
      </div>
    );
  }
}

export { App };
