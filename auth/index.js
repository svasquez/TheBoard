(function (auth) {

    var data = require("../data");
    var hasher = require("./hasher");

    var passport = require("passport");
    var localStrategy = require("passport-local").Strategy;

    function userVerify(username, password, next) {
        data.getUser(username, function (err, user) {
            if (!err && user) {
                var testHash = hasher.computeHash(password, user.salt);
                if (testHash === user.passwordHash) {
                    next(null, user);
                    return;
                }

            }

            next(null, false, { message: "Invalid Credentials." });
        });
    };

    auth.ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) { 
      next();
    } else {
      res.redirect("/login");
    }
  };

  auth.ensureApiAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) { 
      next();
    } else {
      res.send(401, "Not authorized");
    }
  };

    auth.init = function (app) {
        passport.use(new localStrategy(userVerify));
        passport.serializeUser(function (user, next) {
            next(null, user.username);
        });
        passport.deserializeUser(function (key, next) {
            data.getUser(key, function (err, user) {
                if (err) {
                    next(null, false, { message: "Failed to retrieve user." });
                } else {
                    next(null, user);
                }
            });
        });
        app.use(passport.initialize());
        app.use(passport.session());

        app.get("/login", function (req, resp) {
            resp.render("login", { title: "Login for The Board", message: req.flash("loginError") });
        });

        app.get("/register", function (req, resp) {
            resp.render("register", { title: "Register for The Board", message: req.flash("registrationError") });
        });

        app.post("/login", function (req, resp, next) {
            var authFunction = passport.authenticate("local", function (error, user, info) {
                if (error) {
                    next(error);
                } else {
                    req.logIn(user, function (err) {
                        if (err) {
                            next(err);
                        } else {
                            resp.redirect("/");
                        }

                    });
                }
            });

            authFunction(req, resp, next);
        });

        app.post("/register", function (req, resp) {

            var salt = hasher.createSalt();
            var user = {
                name: req.body.name,
                email: req.body.email,
                username: req.body.username,
                passwordHash: hasher.computeHash(req.body.password, salt),
                salt: salt

            };

            data.addUser(user, function (err) {
                if (err) {
                    req.flash("registrationError", "Could not save user.");
                    resp.redirect("/register");
                } else {
                    resp.redirect("/login");
                }

            });
        });
    };

})(module.exports);