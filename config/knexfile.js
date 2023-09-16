module.exports = {
  client: "mysql2",
  connection: {
    host: process.env.BASE_HOST,
    user: process.env.BASE_USER,
    password: process.env.BASE_PASSWORD,
    database: process.env.BASE_NAME
  },
};