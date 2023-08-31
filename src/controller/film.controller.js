const { knex } = require("../database");
const filmValidation = require("../validations/film.validation");

const create = async (req, res, next) => {
  try {
    const { name, description, year, price, video_url, file, release } =
      req.body;

    const validationError = filmValidation({
      name,
      description,
      year,
      price,
      video_url,
      file,
      release,
    });
    if (validationError) throw new CustomError(400, "Authentication failed");

    const film = await knex('film').select('*')
  } catch (error) {
    next(error);
  }
};

module.exports = { create };
