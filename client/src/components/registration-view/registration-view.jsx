import React, { useState } from "react";
import axios from "axios";

import "./registration-view.scss";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export function RegistrationView(props) {
  const [username, createUsername] = useState("");
  const [password, createPassword] = useState("");
  const [email, createEmail] = useState("");
  const [birthday, createBirthday] = useState("");

  const handleRegistration = (e) => {
    e.preventDefault();


    axios.post("hhttps://shielded-oasis-17182.herokuapp.com/users", {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
      .then((response) => {
        const data = response.data;
        alert('Your account has been created.');
        console.log(data);
        window.open("/", "_self");
      })
      .catch((e) => {
        console.log("Something went wrong.");
      });
  };

  return (

    <Form className="registration-form">

      <Form.Group controlId="formBasicUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => createUsername(e.target.value)} />
        <Form.Text className="text-muted">
          Create a username for your account.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e) => createPassword(e.target.value)} />
        <Form.Text className="text-muted">
          Create a password for your account.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address:</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => createEmail(e.target.value)} />
        <Form.Text className="text-muted">
          Enter a valid email address.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicBirthday">
        <Form.Label>Date of birth:</Form.Label>
        <Form.Control type="date" placeholder="Enter date of birth" value={birthday} onChange={(e) => createBirthday(e.target.value)} />
        <Form.Text className="text-muted">
          Please provide your birthday in this format (dd/mm/yyyy).
        </Form.Text>
      </Form.Group>

      <Button variant="primary" type="submit" onClick={handleRegistration}>Register</Button>
    </Form>
  );
}