import React, { useState, useEffect } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import './index.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
var createIssue = require('github-create-issue');

export default function Editor(props) {
  const mdParser = new MarkdownIt({
    highlight: function(str, lang = 'javascript') {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(lang, str).value;
        } catch (__) {}
      }
    }
  });
  const { value, closeEditor } = props;
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  useEffect(() => {
    if (value) {
      setText(value);
    }
  }, []);
  const handleEditorChange = () => ({ html, text }) => {
    setText(text);
  };
  const renderHTML = text => {
    return mdParser.render(text);
  };
  const titleChange = (e) => {
    const title = e.target.value;
    setTitle(title)
  }
  const submit = () => {
    if (title && text) {
      newIssue({
        title,
        text
      })
    } else {
      new window.Notification('Warning', {
        body: 'title or text validation failed!'
      })
    }
  }
  const newIssue = ({title, text}) => {
    var opts = {
      // token: '83fddad3c4a1a67fc801ced2fb35e9e4c171d49b',
      token: props.account.token,
      body: text
    };
    createIssue(
      'zlx362211854/daily-study',
      title,
      opts,
      (error, issue, info) => {
        if (info) {
          console.error('Limit: %d', info.limit);
          console.error('Remaining: %d', info.remaining);
          console.error('Reset: %s', new Date(info.reset * 1000).toISOString());
        }
        if (error) {
          throw new Error(error.message);
        }
        if (issue) {
          new window.Notification('Create issue successfully!', {
            title: issue.title,
            body: issue.body.slice(0, 20) + '...'
          })
          closeEditor()
        }
      }
    );
  };
  return (
    <div style={{ height: '100%', width: window.innerWidth - 310 + 'px' }}>
      <div className="title">
        <div className="titleInput">
          <TextField
            id="standard-full-width"
            label="title"
            style={{ margin: 8 }}
            placeholder="Enter the title"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
            onChange={titleChange}
          />
        </div>
        <div className="titleButton">
          <Button variant="contained" color="primary" onClick={submit}>Submit</Button>
        </div>
      </div>
      <div className="mdEditor">
        <MdEditor
          value={text}
          renderHTML={renderHTML}
          onChange={handleEditorChange()}
        />
      </div>
    </div>
  );
}
