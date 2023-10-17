const { Reservations } = require("../models");
const { findAll, save, removeById, findById } = require("../helpers");
const moment = require("moment");
const SqlGo2 = require("../utils/SqlGo2");
const { DATE_HOUR_FORMAT, DATE_FORMAT } = require("../constants");

exports.showSpecified = async (req, res) => {
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

exports.showAll = async (req, res) => {
  try {
    const { query } = req;
    const reservationsPayload = await SqlGo2({
      modelName: "reservations",
      data: {
        restaurant_id: query.restaurant_id,
      },
      res
    }).filter({
      equals: ["restaurant_id"]
    }).select();

    res.json({
      status: "success",
      message: "Udało się pobrać listę rezerwacji.",
      data: reservationsPayload
    })
  } catch(error) {
    res.json({
      status: "error",
      message: "Nie udało się pobrać rezerwacji"
    })
  }
}

exports.save = async (req, res) => {
  try {
    const { body } = req;
    const reservations = await findAll({
      model: Reservations,
      query: {
        restaurant_id: body.restaurant_id,
        table_id: body.table_id,
      },
      allowedFilters: ["restaurant_id", "table_id"],
    });

    const filtered = reservations.results.filter(
      (reservation) =>
        moment(reservation.reservation_start).isSame(
          body.reservation_start.split(" ")[0],
          "day"
        ) ||
        moment(reservation.reservation_end).isSame(
          body.reservation_start.split(" ")[0],
          "day"
        )
    );

    const isOverlapping = filtered.some((existingReservation) => {
      const existingStart = existingReservation.reservation_start;
      const existingEnd = existingReservation.reservation_end;
      const newStart = body.reservation_start;
      const newEnd = body.reservation_end;

      return (
        (moment(newStart).isSameOrAfter(existingStart) &&
          moment(newStart).isSameOrBefore(existingEnd)) ||
        (moment(newEnd).isSameOrAfter(existingStart) &&
          moment(newEnd).isSameOrBefore(existingEnd))
      );
    });

    if (isOverlapping) {
      res.json({
        status: "error",
        message: "Nie można zarezerwować stolika na podane godziny"
      })
    } else {
      res.json({
        status: "success",
        message: "Rezerwacja została dodana pomyślnie",
        data: body,
      });

      await save({
        model: Reservations,
        data: body,
      });
    }

  } catch (error) {
    res.json({
      status: "error",
      message: "Wystąpił błąd serwera. " + error,
    });
  }
};
