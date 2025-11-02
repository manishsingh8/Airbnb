const Home = require("../model/home");
const Favorite = require("../model/favourite");

exports.getHomes = (req, res) => {
  Home.find()
    .then((registeredHome) => {
      res.render("store/home", {
        registeredHome,
        pageTitle: "airbnb",
        isLoggedIn: req.isLoggedIn,
      });
    })
    .catch((error) => console.log("Error while fetching data", error));
};

exports.getHomeList = (req, res) => {
  Home.find().then((registeredHome) => {
    res.render("store/homeList", {
      registeredHome,
      pageTitle: "Listed Homes",
      isLoggedIn: req.isLoggedIn,
    });
  });
};

exports.getHomeDetails = (req, res) => {
  let id = req.params.homeId;
  Home.findById(id).then((homeDetails) => {
    if (!homeDetails) {
      res.redirect("/host/home-list");
    } else {
      res.render("store/homeDetails", {
        homeDetails,
        pageTitle: "Home Details",
        isLoggedIn: req.isLoggedIn,
      });
    }
  });
};

exports.getHomeBookings = (req, res) => {
  res.render("store/bookings", {
    pageTitle: "Bookings",
    isLoggedIn: req.isLoggedIn,
  });
};

exports.getReservedHome = (req, res) => {
  res.render("store/reservedHome", {
    pageTitle: "Reserved Home",
    isLoggedIn: req.isLoggedIn,
  });
};

exports.getFavouriteList = (req, res) => {
  Favorite.find()
    .populate("homeId")
    .then((favorite) => {
      const favoriteHomes = favorite.map((home) => home.homeId);
      res.render("store/favouriteList", {
        favoriteHomes,
        pageTitle: "Favourite List",
        isLoggedIn: req.isLoggedIn,
      });
    });
};
exports.postFavorite = (req, res) => {
  const homeId = req.body.id;
  const home = new Favorite({ homeId });
  home
    .save()
    .then(() => {
      console.log("Home saved successfully");
    })
    .catch((err) => console.log("Error while adding to favorite", err))
    .finally(() => {
      res.redirect("/favourite-list");
    });
};
exports.postRemoveFavorite = (req, res) => {
  const homeId = req.params.homeId;
  Favorite.findOneAndDelete({ homeId }).then((msg) => {
    console.log(msg);
    res.redirect("/favourite-list");
  });
};
