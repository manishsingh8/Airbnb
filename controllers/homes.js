const Home = require("../model/home");

exports.getAddHome = (req, res, next) => {
  res.render("addHome", { pageTitle: "Add Home" });
};

exports.postAddHome = (req, res, next) => {
  const { homeName, homePrice, homeLocation, homeRating } = req.body;
  const home = new Home(homeName, homePrice, homeLocation, homeRating);
  home.save();
  res.render("homeAdded", { pageTitle: "Home Registered" });
};

exports.getHomes = (req, res, next) => {
  Home.fetchAll((registeredHome) =>
    res.render("home", { registeredHome, pageTitle: "airbnb" })
  );
};
