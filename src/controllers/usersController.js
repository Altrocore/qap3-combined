const db = require('../../db');

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const result = await db.query('SELECT * FROM users');
      res.render('users', { users: result.rows });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },

  createUser: async (req, res) => {
    try {
      const { name, email } = req.body;
      const result = await db.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email]);
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { name, email } = req.body;
      const { id } = req.params;
      const result = await db.query('UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *', [name, email, id]);
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      await db.query('DELETE FROM users WHERE id = $1', [id]);
      res.json({ message: 'User deleted' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },
};
