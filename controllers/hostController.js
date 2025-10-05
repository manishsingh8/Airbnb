const Home = require("../model/home");

exports.getAddHome = (req, res, next) => {
  res.render("host/editHome", {
    editing: false,
    homeDetails: [],
    pageTitle: "Add Home",
  });
};
exports.getEditHome = (req, res, next) => {
  const editing = req.query.editing === "true";
  const id = req.params.homeId;
  Home.findById(id, (homeDetails) => {
    if (!homeDetails) {
      console.log("Home Not Found for editing.");
      return res.redirect("/home-list");
    }
    res.render("host/editHome", {
      editing,
      homeDetails,
      pageTitle: "Add Home",
    });
  });
};

exports.getAdminHomeList = (req, res, next) => {
  Home.fetchAll((registeredHome) => {
    res.render("host/adminHomeList", {
      registeredHome,
      pageTitle: "Admin Home Details",
    });
  });
};

exports.postAddHome = (req, res, next) => {
  const { homeName, homePrice, homeLocation, homeRating } = req.body;
  const home = new Home(homeName, homePrice, homeLocation, homeRating);
  home.save();
  res.redirect("/home-list");
};
exports.postUpdateHome = (req, res, next) => {
  const { id, homeName, homePrice, homeLocation, homeRating } = req.body;
  const home = new Home(homeName, homePrice, homeLocation, homeRating);
  home.id = id;
  home.save();
  res.redirect("/home-list");
};
exports.postDeleteHome = (req, res, next) => {
  const id = req.params.homeId;
  Home.deleteById(id, () => {
    console.log("Home Deleted SuccessFully");
    res.redirect("/host/admin-home-list");
  });
};
