const { Restaurants } = require("../models");
const { findAll, save, removeById, findById } = require("../helpers");

exports.showAll = async (req, res) => {
  try {
    const restaurants = await findAll({
      model: Restaurants,
      query: req?.query,
    });

    res.json({
      status: "success",
      message: "Udało się pobrać listę restauracji",
      data: restaurants,
    });
  } catch (error) {
    res.json({
      status: "error",
      message: "Wystąpił błąd serwera. " + error,
    });
  }
};

exports.findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await findById({
      model: Restaurants,
      id,
    });

    res.json({
      status: "success",
      message: "Udało się pobrać restaurację",
      data: restaurant,
    });
    
  } catch (error) {
    res.json({
      status: "error",
      message: "Wystąpił błąd serwera. " + error,
    });
  }
};

exports.showMyRestaurants = async (req, res) => {
  try {
    const { userId } = req;

    const restaurants = await findAll({
      model: Restaurants,
      query: {
        user_id: userId,
      },
      allowedFilters: ["user_id"],
    });

    res.json({
      status: "success",
      message: "Udało się pobrać listę Twoich restauracji",
      data: restaurants,
    });
  } catch (error) {
    res.json({
      status: "error",
      message: "Wystąpił błąd serwera. " + error,
    });
  }
};

exports.save = async (req, res) => {
  try {
    const { body } = req;
    console.log(body);

    await save({
      model: Restaurants,
      data: body,
    });

    res.json({
      status: "success",
      message: "Restauracja została dodana pomyślnie",
      data: body,
    });
  } catch (error) {
    res.json({
      status: "error",
      message: "Wystąpił błąd serwera. " + error,
    });
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    await removeById({
      model: Restaurants,
      id,
    });

    res.json({
      status: "success",
      message: "Restauracja została prawidłowo ususnięta",
    });
  } catch (error) {
    res.json({
      status: "error",
      message: "Wystąpił błąd serwera. " + error,
    });
  }
};
