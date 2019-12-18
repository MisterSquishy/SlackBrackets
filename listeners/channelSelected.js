const voteBlocks = require("../messageBlocks/vote");
const database = require("../database");

const handle = async ({ channel }) => {
  try {
    database.putChannel({ channel });
  } catch (error) {
    console.error(error);
  }
};

exports.handle = handle;
