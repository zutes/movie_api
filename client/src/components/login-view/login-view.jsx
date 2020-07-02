import React, { useState } from 'react';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  /*
  const handleSubmit = () => {
    console.log(username, password);
    // Send a request to the server for authentication
    // then call props.onLoggedIn(username)
  };
*/

//The extra e you see in the code below, as well as the new e.preventDefault(); method, prevents the default refresh of the page from your handleSubmit()
//method. If you use <Button variant="primary" type="submit"> when your users click the button, the page will refresh, which isn’t the user experience
//you want to give them. This will prevent that default behavior.
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    // Send a request to the server for authentication then call props.onLoggedIn(username)
props.onLoggedIn(username);
    };

  return (
    <form>
      <label>
        Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <button type="button" onClick={handleSubmit}>Submit</button>
    </form>
  );
}