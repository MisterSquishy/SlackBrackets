const matchBlocks = require("../messageBlocks/matches");
const database = require("../database");

const handle = async ({ message, say }) => {
  try {
    const round = database.getRound().index;
    const matches = database.getMatchesByRound({ round });
    say({
      blocks: matchBlocks.blocks({ round, matches })
    });
  } catch (error) {
    console.error(error);
  }
};

exports.handle = handle;
