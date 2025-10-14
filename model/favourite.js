const { getDb } = require("../utils/database");

module.exports = class Favorites {
  constructor(homeId) {
    this.homeId = homeId;
  }
  save() {
    const db = getDb();
    return db
      .collection("favorites")
      .findOne({ homeId: this.homeId })
      .then((existingHome) => {
        if (!existingHome) {
          return db.collection("favorites").insertOne(this);
        }
        return Promise.resolve();
      });
  }
  static getFavorites() {
    const db = getDb();
    return db.collection("favorites").find().toArray();
  }
  static deleteById(id) {
    const db = getDb();
    return db.collection("favorites").deleteOne({ homeId: id });
  }
};
