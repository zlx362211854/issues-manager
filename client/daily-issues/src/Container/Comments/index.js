import React, { useState, useEffect } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ajax from '../../ajax';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import './index.css';
var MarkdownIt = require('markdown-it');
export default function Comments(props) {
  const { issue } = props;
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getComments(props.issue);
  }, [issue]);
  const getComments = issue => {
    setLoading(true);
    ajax(issue.comments_url).then(resp => {
      setLoading(false);
      if (resp) {
        setComments(resp);
      }
    });
  };
  return (
    <div>
      <Typography
        variant="h6"
        gutterBottom
        style={{ textAlign: 'left', paddingLeft: '16px' }}
      >
        {issue.title}
      </Typography>
      <div className={loading ? 'loading' : ''}>
        {issue.body &&
          <div
            className="issueBody"
            dangerouslySetInnerHTML={{
              __html: new MarkdownIt({
                highlight: function(str, lang = 'javascript') {
                  if (lang && hljs.getLanguage(lang)) {
                    try {
                      return hljs.highlight(lang, str).value;
                    } catch (__) {}
                  }
                }
              }).render(issue.body)
            }}
          />
        }
        {comments.map(comment => {
          return (
            <ListItem alignItems="flex-start" key={comment.id} divider={true}>
              <ListItemAvatar>
                <Avatar alt="Travis Howard" src={comment.user.avatar_url} />
              </ListItemAvatar>
              <ListItemText
                primary={comment.user.login}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    >
                      <div
                        dangerouslySetInnerHTML={{
                          __html: new MarkdownIt({
                            highlight: function(str, lang = 'javascript') {
                              if (lang && hljs.getLanguage(lang)) {
                                try {
                                  return hljs.highlight(lang, str).value;
                                } catch (__) {}
                              }
                            }
                          }).render(comment.body)
                        }}
                      />
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
          );
        })}
      </div>
    </div>
  );
}
