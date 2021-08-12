const { MongoClient } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_DATABASE}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = client.db(process.env.DB_DATABASE);
const todosCollection = db.collection(process.env.DB_COLLECTION);

// client.connect(err => {
//   if (err) {
//     console.log(`\x1b[31m[ERR] Could not establish database connection\x1b[0m`);
//     return;
//   }
//   console.log(`\x1b[32m[LOG] Database connected successfully\x1b[0m`);
// });

module.exports = { client, todosCollection };