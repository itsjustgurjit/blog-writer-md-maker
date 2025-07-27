const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname)); // Serve index.html and static files

app.post('/save', (req, res) => {
  const { filename, content } = req.body;

  const safeName = filename.replace(/[^a-zA-Z0-9-_]/g, '');
  const fullPath = path.join(__dirname, 'blogs', safeName + '.md');

  fs.writeFile(fullPath, content, (err) => {
    if (err) {
      return res.status(500).send('Error saving file');
    }
    res.send('File saved successfully');
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
