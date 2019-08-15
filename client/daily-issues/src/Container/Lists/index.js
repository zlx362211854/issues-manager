import React, { useState, useEffect } from 'react';
import '../index.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import ajax from '../../ajax';
import './index.css'
export default function Lists(props) {
  const [issues, setIssues] = useState([]);
  useEffect(() => {
    getIssues()
  }, [])
  const getIssues = () => {
    ajax('https://api.github.com/repos/zlx362211854/daily-study/issues').then(
      resp => {
        if (resp) {
          setIssues(resp);
        }
      }
    );
  };
  const handleClick = (issue) => () => {
    props.openComments(issue)
  }
  return (
    <div className="listContent"  style={{ height: window.innerHeight - 60 }}>
      <div className="listHeader" />
      <List component="nav" aria-label="secondary mailbox folders">
        {issues.map(issue => {
          return (
            <ListItem alignItems="flex-start" key={issue.id} divider={true} onClick={handleClick(issue)}>
              <ListItemAvatar>
                <Avatar
                  alt="Travis Howard"
                  src={issue.user.avatar_url}
                />
              </ListItemAvatar>
              <ListItemText
                primary={issue.user.login}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    >
                      {issue.title}
                    </Typography>
                    <br/>
                    {issue.body.length > 60 ? issue.body.slice(0, 60) + '...' : issue.body}
                    <p className='commentsCount'>{issue.comments + ' comments'}</p>
                    {issue.labels.map(l => {
                      return <Chip label={l.name} key={l.node_id} size="small" style={{background: '#' + l.color}}/>
                    })}
                  </React.Fragment>
                }
              />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}

