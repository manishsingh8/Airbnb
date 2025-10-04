const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/rootDir");

module.exports = class Home {
  constructor(homeName, homePrice, homeLocation, homeRating) {
    this.homeName = homeName;
    this.homePrice = homePrice;
    this.homeLocation = homeLocation;
    this.homeRating = homeRating;
  }

  save() {
    this.id = Math.random().toString();
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
  static findById(id, callback) {
    this.fetchAll((homes) => {
      let homedetails = homes.find((item) => item.id === id);
      callback(homedetails);
    });
  }
};
