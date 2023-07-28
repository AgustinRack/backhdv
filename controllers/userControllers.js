const { generateToken, validateToken } = require("../config/token");
const { Users } = require("../models");
const transporter = require("../helper/mailer");
require("dotenv").config();

const signup = async (req, res) => {
  try {
    const existingUser = await Users.findOne({
      where: { email: req.body.email },
    });

    if (existingUser) {
      return res.status(409).send("El correo electrónico ya está registrado");
    }

    await Users.create(req.body);

    if (req.body.email == "soyeladmin@gmail.com") {
      const adminUser = await Users.findOne({
        where: { email: req.body.email },
      });

      adminUser.admin = true;

      await adminUser.save();
    }
    res.send("usuario creado exitosamente").status(200);
  } catch (err) {
    console.error(err);
  }
};

const login = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: { email: req.body.email },
    });
    if (!user) return res.send("No se encontro el usuario");
    const { id, admin, name, lastName, email, phoneNumber } = user;
    user.validatePassword(req.body.password).then((isValid) => {
      if (!isValid) return res.send("Usuario invalido");
      else {
        const token = generateToken({
          id,
          admin,
          name,
          lastName,
          email,
          phoneNumber,
        });
        res.cookie("token", token);
        res.status(200).send("Usuario ingresado correctamente");
      }
    });
  } catch (err) {
    res.send(err).status(404);
  }
};

const secret = (req, res) => {
  const { payload } = validateToken(req.cookies.token);
  req.user = payload;
  res.send(payload);
};

const logout = (req, res) => {
  res.clearCookie("token");
  res.sendStatus(200);
};

const editUser = async (req, res) => {
  const { id, name, lastName, email, phoneNumber } = req.body;

  try {
    const user = await Users.findOne({ where: { id } });

    user.name = name;
    user.lastName = lastName;
    user.email = email;
    user.phoneNumber = phoneNumber;

    await user.save();

    const token = generateToken({
      id,
      admin: user.admin,
      name,
      lastName,
      email,
      phoneNumber,
    });

    res.cookie("token", token);

    res.send(user).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al actualizar el usuario");
  }
};

const sendEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const { customText } = req.body;

    const response = await transporter.sendMail({
      from: `House of Dev. ${process.env.EMAIL}`,
      to: email,
      subject: "Visita",
      text: `${customText}`,
    });

    res.status(200).send("Correo electrónico enviado correctamente");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al enviar el correo electrónico");
  }
};

const allUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      where: {
        admin: false,
      },
      attributes: { exclude: ["password"] },
    });
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send("Error al enviar todos los usuarios");
  }
};

module.exports = {
  signup,
  login,
  secret,
  logout,
  editUser,
  sendEmail,
  allUsers,
};
