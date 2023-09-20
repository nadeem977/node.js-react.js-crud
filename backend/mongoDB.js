const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017";

const client = new MongoClient(url);
const dataBaseName = "Book-Store"




const DBconnects = async () => {
  const result = await client.connect();
  const db = result.db(dataBaseName);
  return db.collection("Books");
};




const DBauthentication = async () => {
  const result = await client.connect();
  const db = result.db(dataBaseName);
  return db.collection("Authentication");
};

module.exports = {DBconnects, DBauthentication};