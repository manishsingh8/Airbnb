const Home = require("../model/home");
const User = require("../model/user");

exports.getHomes = (req, res) => {
  Home.find()
    .then((registeredHome) => {
      res.render("store/home", {
        registeredHome,
        pageTitle: "airbnb",
        isLoggedIn: req.isLoggedIn,
        user: req.session.user,
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
      user: req.session.user,
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
        user: req.session.user,
      });
    }
  });
};

exports.getHomeBookings = (req, res) => {
  res.render("store/bookings", {
    pageTitle: "Bookings",
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};

exports.getReservedHome = (req, res) => {
  res.render("store/reservedHome", {
    pageTitle: "Reserved Home",
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};

exports.getFavouriteList = async (req, res) => {
  const userId = req.session.user._id;
  const user = await User.findById(userId).populate("favourites");
  res.render("store/favouriteList", {
    favoriteHomes: user.favourites,
    pageTitle: "Favourite List",
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};
exports.postFavorite = async (req, res) => {
  const homeId = req.body.id;
  const userId = req.session.user._id;
  const user = await User.findById(userId);
  console.log(homeId);
  if (!user.favourites.includes(homeId)) {
    user.favourites.push(homeId);
    user.save();
  }
  res.redirect("/favourite-list");
};
exports.postRemoveFavorite = async (req, res) => {
  const homeId = req.params.homeId;
  const userId = req.session.user._id;
  const user = await User.findById(userId);
  if (user.favourites.includes(homeId)) {
    user.favourites = user.favourites.filter(
      (fav) => fav.toString() !== homeId.toString()
    );
    await user.save();
  }
  res.redirect("/favourite-list");
};
