const express = require('express');
const app = express();
const PORT = 3000;

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);


app.use(express.json());

// contoh GET
app.get('/api/users', (req, res) => {
  res.json([{ id: 1, name: 'Davin', email: 'davin@example.com' }]);
});

// contoh POST
app.post('/stok', (req, res) => {
  const { name, email } = req.body;
  res.json({ message: 'Data stok berhasil ditambahkan', data: { name, email } });
});

// contoh PUT
app.put('/stok/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  res.json({ message: 'Data stok berhasil diupdate', data: { id, name, email } });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});

app.get('/stack', (req, res) => {
  res.json({ message: 'Ini response dari /stack' });
});
