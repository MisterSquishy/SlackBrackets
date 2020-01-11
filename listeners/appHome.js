const noCaptainHome = require("../messageBlocks/noCaptainHome");
const captainHome = require("../messageBlocks/captainHome");
const voterHome = require("../messageBlocks/voterHome")
const database = require("../database")

const handleAppHomeOpened = async ({ app, event, context }) => {
  try {
    const result = await app.client.views.publish({
      token: context.botToken,
      user_id: event.user,

      view: {
        type: "home",
        callback_id: "home_view",

        blocks: await getAppHomeBlocksForUser({ user: event.user })
      }
    });
  } catch (error) {
    console.error(error);
  }
};

const getAppHomeBlocksForUser = async ({ user }) => {
  const { captain } = database.getCaptain();
  if(!captain) {
    return noCaptainHome.blocks();
  }
  else if(captain === user) {
    return captainHome.blocks();
  }
  else {
    return await voterHome.blocks();
  }
}

exports.handle = handleAppHomeOpened;
