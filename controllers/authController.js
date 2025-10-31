exports.getLogin = (req, res) => {
  res.render("auth/login", {
    pageTitle: "Login",
    isLoggedIn: false,
  });
};

exports.postLogin = (req, res) => {
  res.cookie("isLoggedIn", true);
  res.redirect("/");
};
