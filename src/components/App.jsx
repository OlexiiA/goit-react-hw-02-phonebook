import React from "react";
import { Form } from "./Form/Form";
import { nanoid } from 'nanoid'
import { FormItem } from "./FormItem/FormItem";
import {Filter} from './Filter/Filter'


export class App extends React.Component {

  state = {
    contacts: [{id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},],
    name: '',
    number:'',
    filter:''
  }


  addContact = text => {
    console.log(text)
    const contact = {
      id: nanoid(),
      name: text,
      number: text,
    }
    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }))
    
  }
  handleDeleteContact = nameId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(cont => cont.id !== nameId)
    }))
  }

  filterByName = (e) => {
this.setState({
  filter: e.currentTarget.value
})
  }

  visibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalized = filter.toLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalized));
  };

  render() {
    const visibleContacts = this.visibleContacts();

    return (
      <div>
        <h1>Phonebook</h1>
        <Form onSubmit={this.addContact} />
        <h2>Contacts</h2>
        <Filter 
        filterName={this.filterByName}
        value={this.state.filter}
        />
        <FormItem
          onDelete={this.handleDeleteContact}
          contacts={visibleContacts}
           />
      </div>
    )
  }

};
