const Home = require("../model/home");
const Favorite = require("../model/favourite");

exports.getHomes = (req, res, next) => {
  Home.fetchAll()
    .then(([registeredHome]) => {
      res.render("store/home", { registeredHome, pageTitle: "airbnb" });
    })
    .catch((error) => console.log("Error while fetching data", error));
};

exports.getHomeList = (req, res, next) => {
  Home.fetchAll().then(([registeredHome]) => {
    res.render("store/homeList", { registeredHome, pageTitle: "Listed Homes" });
  });
};

exports.getHomeDetails = (req, res, next) => {
  let id = req.params.homeId;
  Home.findById(id).then(([rows]) => {
    const homeDetails = rows[0];
    if (!homeDetails) {
      res.redirect("/host/home-list");
    } else {
      res.render("store/homeDetails", {
        homeDetails,
        pageTitle: "Home Details",
      });
    }
  });
};

exports.getHomeBookings = (req, res, next) => {
  res.render("store/bookings", { pageTitle: "Bookings" });
};

exports.getReservedHome = (req, res, next) => {
  res.render("store/reservedHome", { pageTitle: "Reserved Home" });
};

exports.getFavouriteList = (req, res, next) => {
  Favorite.getFavorites((favorite) => {
    Home.fetchAll().then(([registeredHome]) => {
      const favoriteHomes = registeredHome.filter((home) =>
        favorite.includes(home.id)
      );
      res.render("store/favouriteList", {
        favoriteHomes,
        pageTitle: "Favourite List",
      });
    });
  });
};

exports.postFavorite = (req, res, next) => {
  const homeId = req.body.id;
  Favorite.addToFavorite(homeId, (error) => {
    if (error) {
      console.log("Error while marking favorite", error);
    }
    res.redirect("/favourite-list");
  });
};
exports.postRemoveFavorite = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log(homeId, "id");
  Favorite.deleteById(homeId, (msg) => {
    console.log(msg);
    res.redirect("/favourite-list");
  });
};
