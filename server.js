const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.get('/api/data', (req, res) => {
  res.json({ message: 'Data dari backend!' });
});

app.listen(5000, () => {
  console.log('Backend berjalan di http://localhost:5000');
});