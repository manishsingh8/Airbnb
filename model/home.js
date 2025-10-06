const db = require("../utils/database");
module.exports = class Home {
  constructor(homeName, homePrice, homeLocation, homeRating, id) {
    this.homeName = homeName;
    this.homePrice = homePrice;
    this.homeLocation = homeLocation;
    this.homeRating = homeRating;
    this.id = id;
  }

  save() {
    if (this.id) {
      return db.execute(
        "UPDATE homes SET homeName = ?, homePrice = ?, homeLocation = ?, homeRating = ? WHERE id=?",
        [
          this.homeName,
          this.homePrice,
          this.homeLocation,
          this.homeRating,
          this.id,
        ]
      );
    } else {
      return db.execute(
        "INSERT INTO homes (homeName, homePrice, homeLocation, homeRating) VALUES(?, ?, ?, ?)",
        [this.homeName, this.homePrice, this.homeLocation, this.homeRating]
      );
    }
  }

  static fetchAll() {
    return db.execute("SELECT * FROM homes");
  }
  static findById(id) {
    return db.execute("SELECT * FROM homes WHERE id=?", [id]);
  }
  static deleteById(id) {
    return db.execute("DELETE FROM homes WHERE id=?", [id]);
  }
};
