const optInBlocks = require("../messageBlocks/optIn");
const database = require("../database");

const handle = async ({ app, token }) => {
  try {
    const { channel } = database.getChannel();
    const result = await app.client.chat.postMessage({
      token,
      channel,
      blocks: optInBlocks.blocks()
    });
    database.resetUsers();
    database.resetRound();
    database.resetMatches();
  } catch (error) {
    console.error(error);
  }
};

exports.handle = handle;
