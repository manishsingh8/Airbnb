const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/rootDir");

const homeDataPath = path.join(rootDir, "data", "home.json");

module.exports = class Home {
  constructor(homeName, homePrice, homeLocation, homeRating) {
    this.homeName = homeName;
    this.homePrice = homePrice;
    this.homeLocation = homeLocation;
    this.homeRating = homeRating;
  }

  save() {
    Home.fetchAll((registeredHome) => {
      if (this.id) {
        registeredHome = registeredHome.map((home) =>
          home.id === this.id ? this : home
        );
      } else {
        this.id = Math.random().toString();
        registeredHome.push(this);
      }
      fs.writeFile(homeDataPath, JSON.stringify(registeredHome), (err) =>
        console.log("Error while writing in file", err)
      );
    });
  }

  static fetchAll(callback) {
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
  static deleteById(id, callback) {
    this.fetchAll((homes) => {
      const updatedList = homes.filter((home) => home.id !== id);
      fs.writeFile(homeDataPath, JSON.stringify(updatedList), (err) => {
        if (err) {
          console.log("Error while deleting home:", err);
          return callback("Error while deleting home");
        }
        callback("Home Deleted Successfully");
      });
    });
  }
};
