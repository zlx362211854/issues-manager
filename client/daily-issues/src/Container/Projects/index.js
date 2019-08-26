import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './index.css';
import ajax from '../../ajax';
const IPC = window.require('electron').ipcRenderer;
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: 'inline'
  }
}));

export default function Projects(props) {
  const [url, setUrl] = useState('');
  const [add, setAddState] = useState(false);
  const {projects} = props;
  useEffect(() => {
    IPC.send('getData', 'projects');
  }, [])
  const projectNameChange = e => {
    setUrl(e.target.value);
  };
  const validate = () => {
    ajax('https://api.github.com/repos/' + url).then(resp => {
      if (resp.id) {
        new window.Notification(url, {
          body: 'add successful!'
        });
        setAddState(false);
        IPC.send('setData', 'projects', resp, {fresh: true, type: 'push'})
      } else {
        new window.Notification(url, {
          body: 'add failed, please check your account and repository name'
        });
      }
    });
  };
  const classes = useStyles();
  console.log(projects, 'projects');
  return (
    <div className="projectContainer">
      <div className="formContent">
        <Button
          variant="contained"
          color="primary"
          onClick={() => setAddState(true)}
        >
          add Project
        </Button>
        {add && (
          <div>
            <TextField
              id="standard-full-width"
              label="Project"
              style={{ margin: 8 }}
              placeholder="Project url: user/repository"
              helperText="Project url like zlx362211854/daily-study"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
              onChange={projectNameChange}
            />
            <Button
              className="loginButton"
              variant="outlined"
              color="secondary"
              onClick={validate}
            >
              add
            </Button>
          </div>
        )}
        {projects.length > 0 && (
          <List className={classes.root + ' projectList'}>
            {projects.map(p => (
              <ListItem>
                <ListItemText
                  primary={p.full_name}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        Ali Connors
                      </Typography>
                      {p.description}
                    </React.Fragment>
                  }
                />
              </ListItem>
            ))}
          </List>
        )}
      </div>
    </div>
  );
}
