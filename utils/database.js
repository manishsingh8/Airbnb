const Mongo = require("mongodb");

const MongoClient = Mongo.MongoClient;

const mongoUrl = "mongodb+srv://Manish:Manish@airbnb.bxpahzc.mongodb.net";

let _db;
const mongoConnect = (callback) => {
  MongoClient.connect(mongoUrl)
    .then((client) => {
      _db = client.db("airbnb");
      callback();
    })
    .catch((error) => {
      console.log("Error while connecting to mongo :", error);
    });
};

const getDb = () => {
  if (!_db) {
    throw new Error("Mongo is not connected :");
  }
  return _db;
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
