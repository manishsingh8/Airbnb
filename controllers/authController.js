exports.getLogin = (req, res) => {
  res.render("auth/login", {
    pageTitle: "Login",
    isLoggedIn: false,
  });
};

exports.postLogin = (req, res) => {
  req.session.isLoggedIn = true;
  res.redirect("/");
};

exports.getSignup = (req, res) => {
  res.render("auth/signup", {
    pageTitle: "SignUp",
    isLoggedIn: false,
  });
};
exports.postSignup = (req, res) => {
  res.redirect("/login");
};

exports.postLogout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};
