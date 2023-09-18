const { Users } = require("../models");
const { findOneByData, save, findById } = require("../helpers");
const bcrypt = require("bcrypt");
const { pick } = require("lodash");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { body } = req;

    const existingUser = await findOneByData({
      data: { login: body.login },
      model: Users,
    });

    if (existingUser) {
      return res.json({
        status: "error",
        message: "Użytkownik istnieje!",
      });
    }

    if (body.password !== body.passwordRepeat) {
      return res.json({
        status: "error",
        message: "Hasła nie są takie same",
      });
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(body.password, salt);

    const newUser = {
      ...pick(body, ["name", "last_name", "login", "email"]),
      password: hashedPassword,
    };

    await save({
      model: Users,
      data: newUser,
    });

    return res.json({
      status: "success",
      message: "Użytkownik został zarejestrowany pomyślnie",
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: "Coś poszło nie tak " + error,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { login, password } = req.body;
    const user = await findOneByData({
      model: Users,
      data: { login },
    });

    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "Nieprawidłowy login lub hasło",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const accessToken = jwt.sign(
        {
          userId: user.id,
        },
        process.env.TOKEN_SECRET,
        { expiresIn: "1h" }
      );

      const refreshToken = jwt.sign(
        { userId: user.id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "30m" }
      );

      return res.status(200).json({
        status: "success",
        body: {
          id: user.id,
          name: user.name,
          last_name: user.last_name,
          email: user.email,
          company_name: user.company_name,
          city: user.city,
          street: user.street,
          accessToken: `Bearer ${accessToken}`,
          refreshToken: `Bearer ${refreshToken}`
        },
        message: "Użytkownik został zalogowany pomyślnie"
      })
    } else {
      return res.status(401).json({
        status: "error",
        message: "Nieprawidłowy login lub hasło"
      })
    }
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message:
        "Logowanie nie powiodło się, spróbuj ponownie później lub, jeśli błąd się powtarza skontaktuj się z administratorem strony.",
    });
  }
};

exports.isLogged = async (req, res) => {
  try {
    const { token } = req.params;
    let id;

    jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) => {
      if (err) {
        console.log("Weryfikacja tokenu nieudana " + err);
      } else {
        id = decodedToken.userId;
      }
    });

    if (id) {
      const user = await findById({
        id,
        model: Users,
      });

      res.json({
        status: "success",
        data: pick(user, ["id", "email", "name", "last_name", "login", "company_name", "city", "street"]),
      });
    } else {
      res.json({
        status: "error",
        message: "Użytkownik nie jest zalogowany",
      });
    }
  } catch(error) {
    res.json({
      status: "error",
      message: "Wystąpił błąd serwera. " + error
    })
  }
}

exports.save = async (req, res) => {
  try {
    const { body } = req;

    await save({
      model: Users,
      data: body
    });
    
    res.json({
      status: "success",
      message: "Pomyślnie edytowano dane"
    })
  } catch(error) {
    res.json({
      status: "error",
      message: "Wystąpił błąd serwera. " + error
    })
  }
}
