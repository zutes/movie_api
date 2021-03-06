import React, { useState } from "react";
import axios from "axios";
import PropTypes from 'prop-types';

import "./registration-view.scss";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");


  /**
   * Registers user
   * @function handleRegistration
   * @param {string} username
   * @param {string} password
   * @param {string} email
   * @param {date} birthday
   */
  const handleRegistration = (e) => {
    e.preventDefault();

    axios.post("https://shielded-oasis-17182.herokuapp.com/users", {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
      .then(response => {
        const data = response.data;
        console.log(data);
        window.open('/client', '_self');
      })
      .catch(e => {
        console.log('error registering the user')
      });
  };

  return (

    <Form className="registration-form">

      <Form.Group controlId="formBasicUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <Form.Text className="text-info">
          Create your username.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Form.Text className="text-info">
          Create your password.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address:</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Form.Text className="text-info">
          Enter your valid email address.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicBirthday">
        <Form.Label>Date of birth:</Form.Label>
        <Form.Control type="date" placeholder="Enter date of birth" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
        <Form.Text className="text-info">
          Enter your birthday (dd/mm/yyyy).
        </Form.Text>
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleRegistration}>Register</Button >
    </Form>
  );
}

RegistrationView.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
  email: PropTypes.string,
  birthday: PropTypes.string
};