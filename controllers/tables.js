const { Tables } = require("../models");
const { findAll, save, removeById, findById } = require("../helpers");

exports.showAll = async (req, res) => {
  try {
    const { id } = req.params;

    const tables = await findAll({
      model: Tables,
      query: {
        restaurant_id: id,
      },
      allowedFilters: ["restaurant_id"],
    });

    res.json({
      status: "success",
      message: "Udało się pobrać listę stolików",
      data: tables,
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

    body.map(
      async (item) =>
        await save({
          model: Tables,
          data: item,
        })
    );

    res.json({
      status: "success",
      message: "Udało się poprawnie zapisać stoliki",
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
      model: Tables,
      id,
    });

    res.json({
      status: "success",
      message: "Stolik został prawidłowo usunięty",
    });
  } catch (error) {
    res.json({
      status: "error",
      message: "Wystąpił błąd serwera. " + error,
    });
  }
};
