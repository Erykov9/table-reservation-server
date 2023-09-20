const { Reservations } = require("../models");
const { findAll, save, removeById, findById } = require("../helpers");
const moment = require("moment");

exports.showAll = async (req, res) => {
  try {
    const { date, restaurantId, tableId } = req.query;
    const reservations = await findAll({
      model: Reservations,
      query: {
        restaurant_id: restaurantId,
        table_id: tableId,
      },
      allowedFilters: ["restaurant_id", "table_id"],
    });

    const filtered = reservations.results.filter(
      (reservation) =>
        moment(reservation.reservation_start).isSame(date, "day") ||
        moment(reservation.reservation_end).isSame(date, "day")
    );

    res.json({
      status: "success",
      message: "Udało się pobrać listę rezerwacji",
      data: filtered,
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

    await save({
      model: Reservations,
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
