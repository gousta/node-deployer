const express = require('express');
const app = express();
const exec = require('child_process').exec;
const credentials = require('./credentials.json');
const port = 3939;

const regex = /[^a-zA-Z0-9.]/g; // cleaner regex

app.post('/:repo/:secret', (req, res) => {
  const { repo, secret } = req.params;
  console.log("Incoming:", repo, secret);

  if (credentials.secret === secret && repo) {
    const cleaned = repo.replace(regex, repo);
    const location = `/var/www/${cleaned}`;
    try {
      console.log("Executing:", location);
      exec(`cd ${location} && git pull`);
    } catch (e) {
      console.error(e);
    }
  }

  res.send(`OK: ${repo}`);
});

app.listen(port, () => console.log(`NODE DEPLOYER RUNNING ON PORT ${port}!`));
