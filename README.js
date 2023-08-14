const express = require('express');
const bodyParser = require('body-parser');
const { sequelize, User, sequelize } = require('./models');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// ... Configure other middlewares ...

app.post('/transfer', async (req, res) => {
  const { fromAccountId, toAccountId, amount } = req.body;

  try {
    // Start a transaction
    const t = await sequelize.transaction();

    try {
      // Deduct amount from 'from' account
      const fromAccount = await Account.findByPk(fromAccountId);
      fromAccount.balance -= amount;
      await fromAccount.save({ transaction: t });

      // Add amount to 'to' account
      const toAccount = await Account.findByPk(toAccountId);
      toAccount.balance += amount;
      await toAccount.save({ transaction: t });

      // Commit the transaction
      await t.commit();

      res.json({ message: 'Transfer successful' });
    } catch (error) {
      // Rollback the transaction if an error occurs
      await t.rollback();
      throw error;
    }
  } catch (error) {
    res.status(500).json({ error: 'Transfer failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
