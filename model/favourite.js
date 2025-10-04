const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/rootDir");

const favoriteDataPath = path.join(rootDir, "data", "favorite.json");

module.exports = class Favorites {
  static addToFavorite(homeId, callback) {
    console.log(homeId, "fhome id");
    this.getFavorites((favorite) => {
      if (favorite.includes(homeId)) {
        callback("Home is already added in favorite")
      } else {
        favorite.push(homeId);
        fs.writeFile(favoriteDataPath, JSON.stringify(favorite), callback);
      }
    });
  }
  static getFavorites(callback) {
    fs.readFile(favoriteDataPath, (err, data) => {
      callback(!err ? JSON.parse(data) : []);
    });
  }
};
