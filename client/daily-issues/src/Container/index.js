import React, { Component, useState, useEffect } from 'react';
import Lists from './Lists';
import Comments from './Comments';
import Editor from './Editor';
import './index.css';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Login from './Login';
import Account from './Account';
const IPC = window.require('electron').ipcRenderer;

// export default function Container() {
//   const [account setAccount] = useState(null)
//   IPC.on('getDataFromEle', (event, option) => {
//     const {dbname, data} = option;
//     setAccount(data)
//   });

//   return () {

//   }
// }
export default class Container extends Component {
  state = {
    issue: {},
    edit: false
  };
  componentWillMount() {
    IPC.on('getDataFromEle', (event, option) => {
      const {dbname, data} = option;
      this.setState({
        account: data
      });
    });
    IPC.send('getData', 'account');
  }
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
    IPC.send('getData', 'account');
  };
  onLogOutSuccess = () => {
    IPC.send('getData', 'account');
  };
  render() {
    const {issue, edit, account} = this.state;
    console.log(account, 'account')
    if (account) {
      if (account.login) {
        return (
          <div className="container">
            <div className="list">
              <div className="account">
                <Account onOk={this.onLogOutSuccess} account={account} IPC={IPC} />
              </div>
              <Lists openComments={this.openComments} account={account} />
              <div className="add" onClick={this.openEditor}>
                <Fab aria-label="add">
                  <AddIcon account={account} />
                </Fab>
              </div>
            </div>
            <div className="content" style={{height: window.innerHeight}}>
              {edit ? (
                <Editor closeEditor={this.closeEditor} account={account} />
              ) : (
                  <Comments issue={issue} account={account} />
                )}
            </div>
          </div>
        );
      } else {
        return <Login onOk={this.onLoginSuccess} account={account} IPC={IPC} />;
      }
    } else {
      return <div />
    }
  }
}
