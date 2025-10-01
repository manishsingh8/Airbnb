const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/rootDir");

let registeredHome = [];

module.exports = class Home {
  constructor(homeName, homePrice, homeLocation, homeRating) {
    this.homeName = homeName;
    this.homePrice = homePrice;
    this.homeLocation = homeLocation;
    this.homeRating = homeRating;
  }

  save() {
    Home.fetchAll((registeredHome) => {
      registeredHome.push(this);
      const homeDataPath = path.join(rootDir, "data", "home.json");
      fs.writeFile(homeDataPath, JSON.stringify(registeredHome), (err) =>
        console.log("Error while writing in file", err)
      );
    });
  }

  static fetchAll(callback) {
    const homeDataPath = path.join(rootDir, "data", "home.json");
    fs.readFile(homeDataPath, (err, data) => {
      callback(!err ? JSON.parse(data) : []);
    });
  }
};
