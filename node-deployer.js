const express = require('express');
const app = express();
const exec = require('child_process').exec;
const credentials = require('./credentials.json');
const bodyParser = require('body-parser');
const port = 3939;

const regex = /[^a-zA-Z0-9.]/g; // cleaner regex

// parse application/json
app.use(bodyParser.json())

app.post('/___________/:repo', (req, res) => {
  const { repo } = req.params;
  const payload = req.body;

  console.log('payload', JSON.stringify(payload, null, 2));

  if (credentials.secret === payload.hook.config.secret && repo) {
    const cleaned = repo.replace(regex, repo);

    try {
      exec(`cd /var/www/${cleaned} && git pull`);
    } catch (e) {
      console.error(e);
    }
  }

  res.send(`OK: ${repo}`);
});

app.listen(port, () => console.log(`NODE DEPLOYER RUNNING ON PORT ${port}!`));
