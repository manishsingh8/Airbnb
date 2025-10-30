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
  Home.findById(id).then((homeDetails) => {
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
  Home.find().then((registeredHome) => {
    res.render("host/adminHomeList", {
      registeredHome,
      pageTitle: "Admin Home Details",
    });
  });
};

exports.postAddHome = (req, res, next) => {
  const { homeName, homePrice, homeLocation, homeRating } = req.body;
  const home = new Home({ homeName, homePrice, homeLocation, homeRating });
  home
    .save()
    .then(() => {
      console.log("Home Saved SuccessFully");
      res.redirect("/home-list");
    })
    .catch((error) => console.log("Error while adding home to db", error));
};
exports.postUpdateHome = (req, res, next) => {
  const { id, homeName, homePrice, homeLocation, homeRating } = req.body;
  Home.findById(id)
    .then((home) => {
      (home.homeName = homeName),
        (home.homePrice = homePrice),
        (home.homeLocation = homeLocation),
        (home.homeRating = homeRating),
        home
          .save()
          .then((result) => {
            console.log("Home Updated Successfully", result);
            res.redirect("/host/admin-home-list");
          })
          .catch((err) => {
            console.error("Error while saving/updating home:", err);
            res.status(500).send("Database update failed");
          });
    })
    .catch((err) => {
      console.log("Error while fetching home", err);
    });
};

exports.postDeleteHome = (req, res, next) => {
  const id = req.params.homeId;
  Home.findByIdAndDelete(id)
    .then(() => {
      res.redirect("/host/admin-home-list");
    })
    .catch((error) => {
      console.log("Error while deleting home", error);
    });
};
