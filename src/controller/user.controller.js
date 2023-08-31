const bcrypt = require("bcrypt");
const jwt = require("../libs/jwt");
const { generateHash, compareHash } = require("../libs/bcrypt");
const { jwtSecretKey } = require("../../config");
const CustomError = require("../libs/customError");
const { knex } = require("../database");
const userValidation = require("../validations/user.validation");

const changeBalance = async (req, res, next) => {
  try {
    const { user } = req;
    const { balance } = req.body;
    const data = await knex("users")
      .update({ balance: user.balance + balance })
      .where({ id: user.id })
      .returning("*");
    res.status(200).json({ message: "success", data });
  } catch (error) {
    next(error);
  }
};

const find = async (req, res, next) => {
  try {
    const data = await knex("users").select("*");
    res.status(200).json({ message: "success", data });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { username, password, fullname } = req.body;

    const validationError = userValidation({
      username,
      password,
      fullname,
    });
    if (validationError) {
      throw validationError;
    }else{

    const user = await knex("users")
      .select("*")
      .where({ username: username.toLowerCase() })
      .first();

    if (user) throw new CustomError(409, "Username already in use");

    const generate = await generateHash(password);

    const [newUser] = await knex("users")
      .insert({
        username: username.toLowerCase(),
        password: generate,
        fullname,
      })
      .returning("*");

    const token = jwt.sign({ id: newUser.id });

    res.status(201).json({ message: "User successfully created", newUser });
  }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { changeBalance, find, create };