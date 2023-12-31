import React from 'react';
import { nanoid } from 'nanoid';

import { Form, Label, Input, Button } from './ContactForm.styled';

class ContactForm extends React.Component {
  state = {
    name: '',
    number: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    this.handleNewContact();
  };

  handleNameChange = event => {
    this.setState({ name: event.target.value });
  };

  handleNewContact = () => {
    const { name, number } = this.state;
    const { contacts, handleNewContact } = this.props;

    const duplicateName = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (duplicateName) {
      alert(`${name} is already in contacts.`);
      return;
    }

    const id = nanoid();

    const newContact = {
      name: name,
      id: id,
      number: number,
    };

    handleNewContact(newContact);

    this.setState({
      name: '',
      number: '',
    });
  };

  handleTelChange = event => {
    this.setState({ number: event.target.value });
  };

  render() {
    const { name, number } = this.state;

    return (
      <Form autoComplete="off" onSubmit={this.handleSubmit}>
        <Label htmlFor="name">
          Name
          <Input
            type="text"
            id="name"
            className="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={this.handleNameChange}
          />
        </Label>
        <Label htmlFor="tel">
          Number
          <Input
            type="tel"
            id="tel"
            name="number"
            pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={this.handleTelChange}
          />
        </Label>
        <Button type="submit" onClick={this.handleNewContact}>
          Add contact
        </Button>
        <h3>Find contacts by name</h3>
      </Form>
    );
  }
}

export default ContactForm;
