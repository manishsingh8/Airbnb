exports.getError = (req, res) => {
  res.status(404).render("store/404", { pageTitle: "Page Not Found",
    isLoggedIn:req.isLoggedIn
   });
};
