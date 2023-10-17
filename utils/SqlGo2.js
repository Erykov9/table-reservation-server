const knexConfig = require("../config/knexfile");
const knex = require("knex")(knexConfig);

function SqlGo({ modelName, data, res }) {
  let queryBuilder = knex(modelName);

  const api = {
    filter,
    find,
    remove,
    create,
    select,
    sort,
    paginate,
    join,
  };

  function filter({ equals, likes, moreThan, lessThan }) {
    if (equals) {
      equals.forEach((value) => {
        if (value in data) {
          queryBuilder = queryBuilder.where(value, "=", data[value]);
        }
      });
    }

    if (likes) {
      likes.forEach((value) => {
        if (value in data) {
          queryBuilder = queryBuilder.where(value, "like", `%${data[value]}%`);
        }
      });
    }

    if (moreThan) {
      moreThan.forEach((value) => {
        if (value in data) {
          queryBuilder = queryBuilder.where(value, ">", data[value]);
        }
      });
    }

    if (lessThan) {
      lessThan.forEach((value) => {
        if (value in data) {
          queryBuilder = queryBuilder.where(value, "<", data[value]);
        }
      });
    }

    return api;
  }

  function sort(columns) {
    columns.forEach(({ column, direction = "asc" }) => {
      queryBuilder = queryBuilder.orderBy(column, direction);
    });
    return api;
  }

  function paginate(page, pageSize = 10) {
    queryBuilder = queryBuilder.offset((page - 1) * pageSize).limit(pageSize);
    return api;
  }

  function join({ table, mainKey, joinedKey }) {
    queryBuilder = queryBuilder.join(
      table,
      `${modelName}.${mainKey}`,
      "=",
      `${table}.${joinedKey}`
    );
    return api;
  }

  function create({ inputData = data, validationSchema }) {
    const { error, value } = validationSchema.validate(inputData);

    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    return queryBuilder.insert(value).onConflict("id").merge();
  }

  function remove() {
    return queryBuilder.del();
  }

  function select(columns = "*") {
    return (queryBuilder = queryBuilder.select(columns));
  }

  function find(conditions = {}) {
    filter({ equals: Object.keys(conditions) });
    queryBuilder.limit(1);
    return api;
  }

  return api;
}

module.exports = SqlGo;
