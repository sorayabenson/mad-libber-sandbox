const express = require('express');
const superagent = require('superagent');

const app = express();

app.use(express.json());

app.post('/', async (req, res) => {
  const baseURL = 'http://api.vicgalle.net:5000/generate';
  
  const params = {
    context: `${req.query.words}`,
    token_max_length: 120,
    temperature: 1.0,
    top_p: 0.9,
  };
    
  const url = `${baseURL}?context=${params.context}&token_max_length=${params.token_max_length}&temperature=${params.temperature}&top_p=${params.top_p}`;
  
  try {
    const story = await superagent.post(url);
    console.log(story.body.text);

    res.send(story.body.text);
  } catch(err) {
    console.log(err);
  }

});

app.use(require('./middleware/not-found.js'));
app.use(require('./middleware/error.js'));

module.exports = app;
