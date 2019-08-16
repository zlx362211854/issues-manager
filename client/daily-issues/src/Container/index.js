import React, { Component } from 'react';
import Lists from './Lists';
import Comments from './Comments';
import Editor from './Editor';
import './index.css';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Login from './Login';
import Account from './Account';
export default class Container extends Component {
  state = {
    issue: {},
    edit: false,
    login: false
  };
  openComments = issue => {
    this.setState({
      issue,
      edit: false
    });
  };
  openEditor = () => {
    const { edit } = this.state;
    if (!edit) {
      this.setState({
        edit: true
      });
    }
  };
  closeEditor = () => {
    this.setState({
      edit: false
    });
  };
  onLoginSuccess = ({ account, token }) => {
    this.setState({
      login: true
    });
  };
  onLogOutSuccess = () => {
    this.setState({
      login: false
    });
  }
  render() {
    const {issue, edit, login} = this.state;
    const token = window.localStorage.getItem('token')
    const localAccount = JSON.parse(window.localStorage.getItem('account'));
    if (localAccount) {
      localAccount.token = token;
    }
    if (login || localAccount) {
      return (
        <div className="container">
          <div className="list">
            <div className="account">
              <Account onOk={this.onLogOutSuccess} account={localAccount}/>
            </div>
            <Lists openComments={this.openComments} account={localAccount}/>
            <div className="add" onClick={this.openEditor}>
              <Fab aria-label="add">
                <AddIcon account={localAccount}/>
              </Fab>
            </div>
          </div>
          <div className="content" style={{ height: window.innerHeight }}>
            {edit ? (
              <Editor closeEditor={this.closeEditor} account={localAccount}/>
            ) : (
              <Comments issue={issue} account={localAccount}/>
            )}
          </div>
        </div>
      );
    } else {
      return <Login onOk={this.onLoginSuccess} account={localAccount}/>;
    }
  }
}
