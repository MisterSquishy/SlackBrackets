const database = require("../database");

const handle = async ({ channel }) => {
  try {
    database.setChannel({ channel });
  } catch (error) {
    console.error(error);
  }
};

exports.handle = handle;
