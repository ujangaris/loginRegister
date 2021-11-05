import express from 'express';
import db from './config/Database.js';
// import Users from './models/UserModel.js';// ini dinyalakn jika pertama kali mau buat table user
const app = express();

try {
  await db.authenticate();
  console.log('Database Connected...');
  //   await Users.sync(); // untuk mengenerate Table User dengan squelize jika kita belum punya table user, dan ini dinyalakn jika pertama kali mau buat table user
} catch (error) {
  console.error(error);
}
app.listen(5000, () => console.log('App listening on port 5000!'));
