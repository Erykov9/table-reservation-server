const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken")

const authPost = (endpoint, action) => {
  router.post(endpoint, authenticate, action);
};
const authGet = (endpoint, action) => {
  router.get(endpoint, authenticate, action);
};

const authenticate = (req, res, next) => {
  const authHeader = req.headers["access-token"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err)
      return res.json({
        error: "BAD TOKEN",
      });

    req.userId = decoded.userId;

    next();
  });
};

const UsersController = require("./controllers/users");
router.post("/register/", UsersController.register);
router.post("/login/", UsersController.login);
authGet("/isLogged/:token", UsersController.isLogged);
authPost("/edit-user/", UsersController.save);

const RestaurantsController = require("./controllers/restaurants");
router.get("/restaurants/", RestaurantsController.showAll);
authPost("/auth/restaurant/", RestaurantsController.save);
authGet("/auth/restaurants/", RestaurantsController.showMyRestaurants);
authPost("/auth/restaurant/:id/remove", RestaurantsController.remove);
authGet("/auth/restaurants/:id", RestaurantsController.findOne);
router.get("/restaurants/:id", RestaurantsController.findOne)

const TablesController = require("./controllers/tables");
router.get("/tables/:id", TablesController.showAll);
authPost("/auth/tables/", TablesController.save);
authPost("/auth/tables/:id/remove", TablesController.remove);
authGet("/auth/tables/:id", TablesController.getTable);

const ReservationsController = require("./controllers/reservations");
router.get("/reservations/", ReservationsController.showSpecified);
router.post("/reservations/", ReservationsController.save);
authGet("/auth/reservations/", ReservationsController.showAll);

module.exports = router;