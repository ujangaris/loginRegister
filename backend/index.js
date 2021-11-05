import express from 'express';
import db from './config/Database.js';
const app = express();

try {
  await db.authenticate();
  console.log('Database Connected...');
} catch (error) {
  console.error(error);
}
app.listen(5000, () => console.log('App listening on port 5000!'));
