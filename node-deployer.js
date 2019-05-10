const express = require('express')
const app = express()
const exec = require('child_process').exec;
const port = 3939

const regex = /[^a-zA-Z0-9.]/g; // cleaner regex

app.post('/___________/:repo', (req, res) => {
  const { repo } = req.params;
  const cleaned = repo.replace(regex, repo);

  exec(`cd /var/www/${cleaned} && git pull`);

  res.send(`OK: ${repo}`);
});
app.listen(port, () => console.log(`NODE DEPLOYER ${port}!`))