const { check, validationResult } = require("express-validator");
const User = require("../model/user");
const bcrypt = require("bcryptjs");

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

exports.postLogout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};

exports.getSignup = (req, res) => {
  res.render("auth/signup", {
    pageTitle: "SignUp",
    isLoggedIn: false,
    oldInput: [],
  });
};

exports.postSignup = [
  check("firstName")
    .notEmpty()
    .withMessage("FirstName can't be empty")
    .trim()
    .isLength({ min: 2 })
    .withMessage("FirstName must be 2 character long")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("FirstName only contain letters"),

  check("lastName")
    .isLength({ min: 2 })
    .withMessage("LastName must be 2 character long")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("LastName only contain letters"),

  check("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),

  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be 8 character long")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase")
    .trim(),

  check("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password do not match");
      }
      return true;
    }),

  check("userType")
    .notEmpty()
    .withMessage("User type is required")
    .isIn(["guest", "host"])
    .withMessage("Invalid user type"),

  check("term").notEmpty().withMessage("You must accept term and condition"),
  (req, res) => {
    const { firstName, lastName, email, password, userType, term } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).render("auth/signup", {
        pageTitle: "signup",
        isLoggedIn: false,
        errors: errors.array().map((err) => err.msg),
        oldInput: { firstName, lastName, email, password, userType, term },
      });
    }
    bcrypt
      .hash(password, 12)
      .then((hashedPassword) => {
        const user = new User({
          firstName,
          lastName,
          email,
          password: hashedPassword,
          userType,
        });
        return user.save();
      })
      .then(() => {
        res.redirect("login");
      })
      .catch((err) => {
        return res.status(422).render("auth/signup", {
          pageTitle: "signup",
          isLoggedIn: false,
          errors: [err.message],
          oldInput: { firstName, lastName, email, password, userType, term },
        });
      });
  },
];
