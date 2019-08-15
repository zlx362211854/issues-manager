import React, { useState, useEffect } from 'react';
import './index.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ajax from '../../ajax';
export default function Login(props) {
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');
  const userNameChange = (e) => {
    const username = e.target.value;
    setUsername(username)
  }
  const tokenChange = (e) => {
    const token = e.target.value;
    setToken(token)
  }
  const validate = () => {
    if (username && token) {
      ajax('https://api.github.com/user?access_token=' + token).then((resp) => {
        console.log(resp, 'rrrrrrr')
        if (resp) {
          if (resp.login === username) {
            new window.Notification(username, {
              body: 'successful!'
            })
            window.localStorage.setItem('account', JSON.stringify(resp))
            window.localStorage.setItem('token', token);
            props.onOk({account: resp, token})
          }
        }
      })
    }
  }
  return (
    <div className="homePage">
      <div className="formContent">
        <TextField
          id="standard-full-width"
          label="User"
          style={{ margin: 8 }}
          placeholder="github user account"
          helperText="Your github user name"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
          onChange={userNameChange}
        />
        <TextField
          id="standard-full-width"
          label="Token"
          style={{ margin: 8 }}
          placeholder="Personal access tokens"
          helperText="Personal access tokens function like ordinary OAuth access tokens. They can be used instead of a password for Git over HTTPS, go https://github.com/settings/tokens to cenerate a token"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
          onChange={tokenChange}
        />
        <Button className="loginButton" variant="outlined" color="secondary" onClick={validate}>Login</Button>
      </div>
    </div>
  );
}
