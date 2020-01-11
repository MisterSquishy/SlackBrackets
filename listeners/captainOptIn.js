const database = require("../database");

const handle = async ({ user }) => {
  try {
    database.setCaptain({ captain: user });
  } catch (error) {
    console.error(error);
  }
};

exports.handle = handle;
