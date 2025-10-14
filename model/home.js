const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/database");

module.exports = class Home {
  constructor(homeName, homePrice, homeLocation, homeRating, _id) {
    this.homeName = homeName;
    this.homePrice = homePrice;
    this.homeLocation = homeLocation;
    this.homeRating = homeRating;
    if (_id) {
      this._id = _id;
    }
  }

  save() {
    const db = getDb();
    if (this._id) {
      const updatedField = {
        homeName: this.homeName,
        homePrice: this.homePrice,
        homeLocation: this.homeLocation,
        homeRating: this.homeRating,
      };
      return db
        .collection("homes")
        .updateOne(
          { _id: new ObjectId(String(this._id)) },
          { $set: updatedField }
        );
    } else {
      return db.collection("homes").insertOne(this);
    }
  }

  static fetchAll() {
    const db = getDb();
    return db.collection("homes").find().toArray();
  }
  static findById(id) {
    const db = getDb();
    return db
      .collection("homes")
      .find({ _id: new ObjectId(String(id)) })
      .next();
  }
  static deleteById(id) {
    const db = getDb();
    return db.collection("homes").deleteOne({ _id: new ObjectId(String(id)) });
  }
};
